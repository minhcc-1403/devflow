import { authApi } from "~/apis/pre-built/1-auth.api";
import { toast } from "~/components/ui/toast";
import type {
  AuthUser,
  Login,
  Register,
  ResetPasswordWithOtp,
  ResetPasswordWithToken,
} from "~/types/pre-built/1-auth";
import type { User } from "~/types/pre-built/2-user";
import { AccountTypeEnum } from "~/utils/enums";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import { storageHelper } from "~/utils/helpers/storage.helper";

export const useAuthStore = defineStore("auth", () => {
  const authUser = ref<AuthUser | null>(storageHelper.getAuth());
  const user = ref<User | null>(storageHelper.getUser());
  const loading = ref<boolean>(false);

  const login = (input: Login) => authenticate(() => authApi.login(input));
  const register = (input: Register) =>
    authenticate(() => authApi.register(input));
  const loginWithGoogle = (idToken: string) =>
    authenticate(() =>
      authApi.socialLogin({ accountType: AccountTypeEnum.Google, idToken }),
    );

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      handleApiError(error);
    }
    updateAuth(null);
  };

  const resetPasswordWithToken = (input: ResetPasswordWithToken) =>
    authenticate(() => authApi.resetPasswordWithToken(input));
  const resetPasswordWithOtp = (input: ResetPasswordWithOtp) =>
    authenticate(() => authApi.resetPasswordWithOtp(input));

  const getAccessToken = async () => {
    if (!authUser.value) return null;

    const currentMS = Date.now();
    const { accessToken, refreshToken } = authUser.value;

    if (accessToken.expiresAt > currentMS) return accessToken.token;
    if (refreshToken.expiresAt < currentMS) return updateAuth(null);

    await getAuthFromRefreshToken(refreshToken.token);
    return authUser.value?.accessToken?.token || null;
  };

  const getAuthFromRefreshToken = async (rfToken: string) => {
    try {
      const data = await authApi.refreshToken(rfToken);
      return updateAuth(data);
    } catch (error) {
      handleApiError(error);
      return updateAuth(null);
    }
  };

  const refreshAuthFromSession = async () => {
    if (
      sessionStorage.getItem("refreshed") ||
      !authUser.value?.refreshToken?.token
    )
      return;
    sessionStorage.setItem("refreshed", "true");
    await getAuthFromRefreshToken(authUser.value.refreshToken.token);
  };

  /**
   * Update auth user data and save to storage
   * @param data AuthUser | null
   * @returns AuthUser | null
   */
  const updateAuth = (data: AuthUser | null) => {
    if (data) {
      authUser.value = { ...authUser.value, ...data };
      user.value = { ...user.value, ...data.user };
      storageHelper.setAuth(authUser.value);
      storageHelper.setUser(authUser.value.user);
    } else {
      authUser.value = null;
      user.value = null;
      storageHelper.clearAuth();
    }

    return authUser.value;
  };

  /**
   * Generic async handler for authentication functions
   * @param handler Function returning a Promise<AuthUser | null>
   * @returns AuthUser | null
   */
  const authenticate = async (handler: () => Promise<AuthUser | null>) => {
    loading.value = true;
    try {
      const data = await handler();
      return updateAuth(data);
    } catch (error) {
      const { description, title } = handleApiError(error);
      toast({ description, title, variant: "destructive" });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    authUser,
    user,
    loading,
    login,
    register,
    logout,
    getAccessToken,
    loginWithGoogle,
    resetPasswordWithOtp,
    resetPasswordWithToken,
    refreshAuthFromSession,
  };
});
