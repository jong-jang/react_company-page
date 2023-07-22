import Layout from '../common/Layout';

function Members() {
	return (
		<Layout name={'Members'}>
			<form>
				<fieldset>
					<legend>회원가입 폼 양식</legend>
					<table border='1'>
						<tbody>
							{/* userid */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>USER ID</label>
									<input type='text' name='username' placeholder='아이디를 입력하세요' />
								</th>
							</tr>
							{/* password */}
							<tr>
								<th>
									<label htmlFor='pwd1'>PASSWORD</label>
									<input type='password' name='pwd1' placeholder='비밀번호를 입력하세요' />
								</th>
							</tr>
							{/* re password */}
							<tr>
								<th>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
									<input type='password' name='pwd2' placeholder='비밀번호를 재입력하세요' />
								</th>
							</tr>
							{/* email */}
							<tr>
								<th>
									<label htmlFor='email'>EMAIL</label>
									<input type='text' name='pwd2' placeholder='이메일주소를 입력하세요' />
								</th>
							</tr>

							{/* btnSet */}
							<tr>
								<th colSpan={2}>
									<input type='reset' vlaue='cancel' />

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
