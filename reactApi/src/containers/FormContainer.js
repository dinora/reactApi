import React, {Component} from 'react';
import SingleInput from '../components/SingleInput';
import TextArea from '../components/TextArea';

class FormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phonenumber: '',
			description: '',
			name:'',
			des:''
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleCurrentPhoneChange = this.handleCurrentPhoneChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.getSentMessages()
	}
	componentDidMount() {
		fetch('./api')									
			.then(res => res.json(
			{
				"originator":"dinora",
				"body":"The message to be sent"
			}
			))
			.then(data => {
				this.setState({
					originator: data.phonenumber,
					body: data.description
				});
			});
	}

	getSentMessages(){
			fetch("https://rest.messagebird.com/messages?access_key=apK8p6emk55oaPy5UkPTzcouu",{
				method: 'GET',
				credentials: 'same-origin',  
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
			.then(response => response.json())
			
			.then(json => {
				this.setState({des:json.items[0].recipients.items[0].recipient ,name:json.items[0].body})
			})
	}
    sendMessages(value){
		//https://rest.messagebird.com/script?mid=355692939849&keyword=MESSAGEBIRD&originator=355692939849&message=This+is+an+incoming+message
		fetch("https://rest.messagebird.com/messages?access_key=apK8p6emk55oaPy5UkPTzcouu",{
			method: 'POST',
			credentials: 'same-origin',  
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.then(response => response.json())
		
		.then(json => {
			this.setState({des:json.des,name:json.name})
		})
		
	}
	handleCurrentPhoneChange(e) {
		this.setState({ phonenumber: e.target.value }, () => console.log('phone number', this.state.phonenumber));
	}

	handleDescriptionChange(e) {
		this.setState({ description: e.target.value }, () => console.log('description', this.state.description));
	}

	handleFormSubmit(e) {
		e.preventDefault();

		const formPayload = {
			phonenumber: this.state.phonenumber,
			description: this.state.description,
			
			//~ originator: this.state.originator,
			//~ body: this.state.body
			//~ recipients:this.state.recipients
		};
		this.send(formPayload)
		console.log('Send this in a POST request:', formPayload);
		this.handleClearForm(e);
	}
	render() {

		return (
			<form className="container" onSubmit={this.handleFormSubmit}>
				<p className="logo"><img src="logo_msgbird.png" alt="MessageBird" width="200px" /></p>
				<SingleInput
					inputType={'text'}
					title={'Phone Number'}
					name={'phonenumber'}
					content={this.state.phonenumber}
					controlFunc={this.handleCurrentPhoneChange}
					placeholder={'Enter phone number'} />
				
				<TextArea
					title={'Message text'}
					rows={5}
					resize={false}
					content={this.state.description}
					name={'description'}
					controlFunc={this.handleDescriptionChange}
					placeholder={'Please be thorough in your descriptions'} />
				
				<input
					type="submit"
					className="btn btn-primary float-right"
					value="Submit"/>

				 <table className="table">
					<tr>
						<th>Recipient</th>
						<th>Description</th>
					</tr>
					<tr>
						<td>{"Originator: "   + this.state.des}</td>
						<td>{"Message content: " + this.state.name}</td>
					</tr>
				</table>
            </form>
		);
	}
}

export default FormContainer;
