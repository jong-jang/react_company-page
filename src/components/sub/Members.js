import { useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Members() {
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
	};
	const [Val, setVal] = useState(initVal);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const check = (value) => {
		//인수로 현재 state값을 전달받아서 에러메시지 객체를 반환하는로직
		const errs = {};
		const eng = /[a-zA-z]/;
		const num = /[0-9]/;
		const spc = /[!@#$%^&*()_+]/;

		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		if (value.pwd1.length < 5 || !eng.test(value.pwd1) || !num.test(value.pwd1) || !spc.test(value.pwd1)) {
			errs.pw1 = '비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요';
		}
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pw2 = '두개의 비밀번호를 동일하게 입력하세요';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email = '이메일 주소는 8글자 이상 @를 포함하세요';
		}
		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('현재 state값', Val);
		// check함수가 반환하는 에러메시지 객체가 없으면 인증 통과, 있으면 인증 실패
		console.log(check(Val));
	};

	useEffect(() => {}, [Val]);
	return (
		<Layout name={'Members'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원 가입 폼 양식</legend>
					<table border='1'>
						<tbody>
							{/* userid */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>USER ID</label>
								</th>
								<td>
									<input type='text' name='userid' placeholder='아이디를 입력하세요' value={Val.userid} onChange={handleChange} />
								</td>
							</tr>

							{/* password */}
							<tr>
								<th>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>
								<td>
									<input type='password' name='pwd1' placeholder='비밀번호를 입력하세요' value={Val.pwd1} onChange={handleChange} autoComplete='current-password' />
								</td>
							</tr>

							{/* re password */}
							<tr>
								<th>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
								</th>
								<td>
									<input type='password' name='pwd2' placeholder='비밀번호를 재입력하세요' value={Val.pwd2} onChange={handleChange} autoComplete='current-password' />
								</td>
							</tr>

							{/* email */}
							<tr>
								<th>
									<label htmlFor='email'>EMAIL</label>
								</th>
								<td>
									<input type='text' name='email' placeholder='이메일주소를 입력하세요' value={Val.email} onChange={handleChange} />
								</td>
							</tr>

							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='CANCEL' />

									<input type='submit' value='SEND' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Members;
