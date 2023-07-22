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

	useEffect(() => {
		console.log(Val);
	}, [Val]);
	return (
		<Layout name={'Members'}>
			<form>
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
									<input type='password' name='pwd1' placeholder='비밀번호를 입력하세요' value={Val.pwd1} onChange={handleChange} />
								</td>
							</tr>

							{/* re password */}
							<tr>
								<th>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
								</th>
								<td>
									<input type='password' name='pwd2' placeholder='비밀번호를 재입력하세요' value={Val.pwd2} onChange={handleChange} />
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
