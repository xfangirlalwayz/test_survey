import React from "react";
import { HashRouter, Route } from "react-router-dom";
import firebase from "./firebase";
import Resume from "./Resume";
import LandingPage from "./LandingPage";
import Admin from "./Admin";
import { IS_DEMO_VERSION } from "./config";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

var moment = require("moment-timezone");

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.activityCounter = 1;
		this.recordActivity = this.recordActivity.bind(this);

		this.DATABASE = firebase.firestore();

		// This is hacky, but ReactRouter can't parse URL parameters unless inside a Route
		const loc = document.location.hash;
		this.applicantNumber = parseInt(loc.split("/")[1]);
		this.tierNumber = parseInt(loc.split("/")[2]);
		this.qualtricsUserId = loc.split("/")[3];

		// Print for debugging purposes within Qualtrics
		console.log("qualtricsUserId: " + this.qualtricsUserId);
	}

	/** Record the data (in Firebase, and print to console) */
	async recordActivity(category, value, description) {
		if (this.qualtricsUserId === undefined) return;

		// This will be the ID of the activity in Firebase -- a string, padded to 5 digits so alphabetical sorting works
		const id = this.activityCounter.toString().padStart(5, "0");
		this.activityCounter = this.activityCounter + 1;

		const now = moment();

		if (!IS_DEMO_VERSION) {
			this.DATABASE.collection("responseIDs")
				.doc(this.qualtricsUserId + "_tier" + this.tierNumber.toString())
				.collection("app" + this.applicantNumber.toString())
				.doc(id)
				.set({
					category: category,
					description: description,
					value: value,
					timestamp: new Date(now),
					timeEpoch: Number(now.format("x")),
					timeReadable: now.tz("America/Los_Angeles").format("M-D-YY h:mm:ssa"),
				});
		}

		console.log(id + " " + category + ": " + value + " -- " + description);
	}

	componentDidMount() {
		// Update activityCounter to ensure previously recorded activity data are not overwritten
		this.DATABASE.collection('responseIDs')
			.doc(this.qualtricsUserId + '_tier' + this.tierNumber.toString())
			.collection('app' + this.applicantNumber.toString()).get()
			.then((querySnapshot) => {
				this.activityCounter = querySnapshot.size + 1
				this.recordActivity("loading", "accessed", "App mounted");
			});
	}

	componentWillUnmount() {
		console.log('componentWillUnmount from App.js');
	}

	render() {
		return (
			<div>
				<HashRouter>
					<Route
						path="/:applicantNumber/:tierNumber/:qualtricsUserId"
						render={(props) => (
							<Resume
								{...props}
								applicantNumber={this.applicantNumber}
								tierNumber={this.tierNumber}
								recordActivity={this.recordActivity}
								qualtricsUserId={this.qualtricsUserId}
							/>
						)}
					/>

					<Route path="/admin" render={() => <Admin />} />

					<Route path="/" exact render={() => <LandingPage />} />
				</HashRouter>
			</div>
		);
	}
}
