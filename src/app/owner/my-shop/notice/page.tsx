'use client';

import useAuthStore from '@/app/stores/authStore';

export default function NoticePage() {
  const { login, signup, logout, getMe, user, userId, type, token } = useAuthStore();

  const handleLogin = async () => {
    console.log(await login({ email: 'qwerasdf@asdf.com', password: 'asdfasdf1' }));
  };

  // 테스트 시 signup email, password 변경 필요
  const handleSignup = async () => {
    console.log(
      await signup({
        email: 'qwerasdf@asdf.com',
        password: 'asdfasdf1',
        type: 'employer',
      })
    );
  };

  const handleLogout = async () => {
    logout();
    console.log(localStorage.getItem('token'));
  };

  const handleGetMe = async () => {
    console.log(await getMe());
  };

  const handleUser = () => {
    console.log(user);
  };

  const handleUserId = () => {
    console.log(userId);
  };

  const handleShopId = () => {
    if (user && user.shop) console.log(user.shop);
    else console.log('shop 없음');
  };

  const handleType = () => {
    console.log(type);
  };

  const handleToken = () => {
    console.log(token);
  };

  return (
    <>
      <div className="flex flex-col">
        <button onClick={handleSignup}>회원가입</button>
        <button onClick={handleLogin}>로그인</button>
        <button onClick={handleLogout}>로그아웃</button>
        <button onClick={handleGetMe}>내 정보</button>
        <button onClick={handleUser}>user</button>
        <button onClick={handleUserId}>userId</button>
        <button onClick={handleShopId}>shopId</button>
        <button onClick={handleType}>type</button>
        <button onClick={handleToken}>token</button>
      </div>
    </>
  );
}
