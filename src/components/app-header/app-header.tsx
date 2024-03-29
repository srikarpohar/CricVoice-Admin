import { useState } from "react";
import { IUser } from "../../models";
import { useLogoutUserMutation, useRefreshTokenQuery } from "../../redux-state/auth/authApiSlice";
import './app-header.scss';
import logo from '../../../assets/icons/cricvoice-logo.png';
import { SERVER_URL } from "../../environment/environment.dev";
import { useNavigate } from "react-router-dom";
import { Spinner, SimpleDropdown } from "@srikarpohar/cricvoice-library";

interface IProps{

}

interface IState{

}

export const AppHeader = (props: IProps) => {
	const [state, setState] = useState<IState>({});

	const navigate = useNavigate();

	const {
		data: response
		} = useRefreshTokenQuery(),
		result = response?.data as { user: IUser, accessToken: string }, 
		theme = result.user?.preference?.theme;

	const [logoutUser, {isLoading}] = useLogoutUserMutation();

	const headerDropdownOptions = [{
		label: "Global Data",
		value: "Global Data"
	}, {
		label: "Signup",
		value: "Signup",
		onClick: () => {
			navigate("/signup");
		}
	}, {
		label: "Logout",
		value: "Logout",
		onClick: () => {
			if(result.user?.id) {
				logoutUser({
					id: result.user.id ? result.user.id.toString() : ''
				})
			}
		}
	}];

	return (<div className={`container-${theme ? theme : 'default'} m-0 p-2 d-flex align-items-center`}>
		<Spinner show={isLoading} />

		<img src={logo} width={220} height={50} className="mx-2"></img>
		<h5 className="mx-2 my-0 w-100">Hello {result.user?.username}</h5>

		<SimpleDropdown title={
				<img src={`${SERVER_URL}static/profilePics${result.user?.profilePicRel?.url}`} 
					className="avatar">
				</img>
			} options={headerDropdownOptions}
		/>
	</div>);
}