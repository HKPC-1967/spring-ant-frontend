/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    // this is the default code by ant design pro
    // canAdmin: currentUser?.access === 'admin',
    // below is the custom code
    roleAdmin: currentUser?.roleIds?.includes(1) || false,
  };
}
