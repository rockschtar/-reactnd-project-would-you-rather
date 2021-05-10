export const IS_LOADING = 'IS_LOADING'

export function isLoading (isLoading = true) {
  return {
    type: IS_LOADING,
    isLoading
  }
}
