import { useEffect, useState } from "react";
import './spinner.component.scss';

interface IProps{
	show: boolean
}

interface IState{
	open: boolean
}

export const Spinner = (props: IProps) => {
	const [state, setState] = useState<IState>({
		open: false
	});

	useEffect(() => {
		if(!props.show) {
			setTimeout(() => {
				setState({
					open: false
				})
			}, 1000);
		} else {
			setState({
				open: true
			})
		}
	}, [props.show])

	if(state.open) {
		return (<div className="screen">
			<section className={`stage stage-${props.show ? 'open' : 'close'}`}>
				<figure className="ball">
					<span className="shadow"></span>
					<span className="line"></span>
				</figure>
			</section>

			<section className={`ground ground-${props.show ? 'open' : 'close'}`}>
				{/* <figure className="grass-1"></figure>
				<figure className="grass-2"></figure> */}
			</section>

		</div>);
	} else
		return null;
}