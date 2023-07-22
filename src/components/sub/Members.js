import { useState, useEffect } from 'react';
import Layout from '../common/Layout';

function Members() {
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
	};
	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		//property의 name값을 변수로 치환해서 현재 입력하고 있는 input요소의 name값으로 state를 변경
		setVal({ ...Val, [name]: value });
	};
	const handleRadio = (e) => {};

	const check = (value) => {
		//인수로 현재 state값을 전달받아서 에러메세지 객체를 반환하는 로직
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[!@#$%^&*()_+]/;

		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		if (value.pwd1.length < 5 || !eng.test(value.pwd1) || !num.test(value.pwd1) || !spc.test(value.pwd1)) {
			errs.pwd1 = '비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요.';
		}
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요.';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email = '이메일 주소는 8글자 이상 @를 포함하세요.';
		}
		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('현재 state값', Val);
		//check함수가 반환하는 에러메세지 객체가 없으면 인증통과, 있으면 인증 실패
		const errs = check(Val);
		//console.log(errs);
		console.log(Object.keys(errs));
		if (Object.keys(errs).length === 0) {
			alert('인증 성공');
		} else {
			alert('인증 실패');
			setErr(errs);
		}
	};

	useEffect(() => {
		//console.log(Val);
	}, [Val]);

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
									{Err?.userid && <p>{Err.userid}</p>}
								</td>
							</tr>

							{/* password */}
							<tr>
								<th>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>
								<td>
									<input type='password' name='pwd1' placeholder='비밀번호를 입력하세요' value={Val.pwd1} onChange={handleChange} />
									{Err?.pwd1 && <p>{Err.pwd1}</p>}
								</td>
							</tr>

							{/* re password */}
							<tr>
								<th>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
								</th>
								<td>
									<input type='password' name='pwd2' placeholder='비밀번호를 재입력하세요' value={Val.pwd2} onChange={handleChange} />
									{Err?.pwd2 && <p>{Err.pwd2}</p>}
								</td>
							</tr>

							{/* email */}
							<tr>
								<th>
									<label htmlFor='email'>EMAIL</label>
								</th>
								<td>
									<input type='text' name='email' placeholder='이메일주소를 입력하세요' value={Val.email} onChange={handleChange} />
									{Err?.email && <p>{Err.email}</p>}
								</td>
							</tr>

							{/* gender */}
							<tr>
								<th>GENDER</th>
								<td>
									<label htmlFor='male'>MAIL</label>
									<input type='radio' name='mail' id='mail' onChange={handleRadio} />
									<label htmlFor='female'>FEMAIL</label>
									<input type='radio' name='mail' id='femail' onChange={handleRadio} />
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
