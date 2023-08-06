import { useState, useEffect, useCallback } from 'react';
import Layout from '../common/Layout';
import { useHistory } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

function Members() {
	const history = useHistory();
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		gender: '',
		interests: '',
		edu: '',
		comments: '',
	};
	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	const [Submit, setSubmit] = useState(false);
	const [Mounted, setMounted] = useState(false);

	const DebouncedVal = useDebounce(Val);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleCheck = (e) => {
		const { name } = e.target;
		let checkArr = [];
		const inputs = e.target.parentElement.querySelectorAll('input');

		inputs.forEach((el) => {
			if (el.checked) {
				checkArr.push(el.value);
			}
		});
		setVal({ ...Val, [name]: checkArr });
	};

	const showCheck = useCallback(() => {
		setErr(check(DebouncedVal));
		setSubmit(false);
	}, [DebouncedVal]);

	useEffect(() => {
		showCheck();
	}, [showCheck]);

	const resetForm = () => {
		setVal(initVal);
	};

	const check = (value) => {
		// 에러메세지 객체를 반환하는 로직
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
		if (!value.gender) {
			errs.gender = '성별을 체크해주세요.';
		}
		if (value.interests.length === 0) {
			errs.interests = '취미를 체크해주세요.';
		}
		if (!value.edu) {
			errs.edu = '최종 학력을 선택해주세요';
		}
		if (value.comments.length < 10) {
			errs.comments = '10글자 이상 입력해주세요.';
		}
		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		Mounted && setErr(check(Val));
		setSubmit(true);
	};

	useEffect(() => {
		const len = Object.keys(Err).length;
		if (len === 0 && Submit) {
			alert('모든 인증을 통과했습니다');
			history.push('/');
		}
		return () => {
			setMounted(false);
		};
	}, [Err, history, Submit]);

	return (
		<Layout name={'Members'}>
			<button onClick={() => history.goBack()}>이전페이지 가기</button>
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
									<label htmlFor='male'>MALE</label>
									<input type='radio' name='gender' id='male' onChange={handleChange} defaultValue='male' />
									<label htmlFor='female'>FEMALE</label>
									<input type='radio' name='gender' id='female' onChange={handleChange} defaultValue='female' />
									{Err?.gender && <p>{Err.gender}</p>}
								</td>
							</tr>

							{/* inerests */}
							<tr>
								<th>INTERESTS</th>
								<td>
									<label htmlFor='sports'>Sports</label>
									<input type='checkbox' id='sports' name='interests' defaultValue='sports' onChange={handleCheck} />

									<label htmlFor='music'>Music</label>
									<input type='checkbox' id='music' name='interests' defaultValue='music' onChange={handleCheck} />

									<label htmlFor='game'>Game</label>
									<input type='checkbox' id='game' name='interests' defaultValue='game' onChange={handleCheck} />

									{Err?.interests && <p>{Err.interests}</p>}
								</td>
							</tr>

							{/* edu */}
							<tr>
								<th>
									<label htmlFor='edu'>EDUCATION</label>
								</th>
								<td>
									<select name='edu' id='educ' onChange={handleChange}>
										<option defaultValue=''>최종학력을 선택하세요.</option>
										<option defaultValue='elementary-school'>초등학교 졸업</option>
										<option defaultValue='middle-school'>중학교 졸업</option>
										<option defaultValue='high-school'>고등학교 졸업</option>
										<option defaultValue='collage'>대학교 졸업</option>
									</select>
									{Err?.edu && <p>{Err.edu}</p>}
								</td>
							</tr>

							{/* comments */}
							<tr>
								<th>
									<label htmlFor='comments'>COMMENTS</label>
								</th>
								<td>
									<textarea name='comments' id='comments' cols='30' rows='3' value={Val.comments} onChange={handleChange} placeholder='입력해주세요'></textarea>
									{Err?.comments && <p>{Err.comments}</p>}
								</td>
							</tr>

							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='CANCEL' onClick={resetForm} />
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
