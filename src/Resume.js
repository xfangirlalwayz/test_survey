import React from "react";
import "./App.css";
import Divider from "@material-ui/core/Divider";
import firebase from "./firebase";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import moment from "moment-timezone";

/*
  This is the main component for the resume page. It displays a resume with various sections that can be toggled open and closed.
  All of the randomization and pre-processing of the Firebase values is done here.
*/

export default class Resume extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			positionList: [],
		};

		// Add props to "this"
		this.recordActivity = this.props.recordActivity;

		const db = firebase.firestore();
		this.db = db; /*connects to firestore db, saves connection to this.db*/

		this.collapsibleOpened = this.collapsibleToggled.bind(this);
	}


	componentDidMount() {
		// applicantNumber used to be called studyVersion
		// tierNumber used to be called resumeVersion
		this.setState({
			applicantNumber: this.props.applicantNumber,
			tierNumber: this.props.tierNumber,
			// courses: [
			// 	{ name: "Statistics", firstSemester: "Full year / first semester", secondSemester: "n/a", thirdTrimester: "n/a" },
			// 	{ name: "AP English Literature", firstSemester: "Full year / first semester", secondSemester: "n/a", thirdTrimester: "n/a" },
			// 	{ name: "AP Chemistry", firstSemester: "Full year / first semester", secondSemester: "n/a", thirdTrimester: "n/a" },
			// 	{ name: "AP US History", firstSemester: "Full year / first semester", secondSemester: "n/a", thirdTrimester: "n/a" },
			// 	{ name: "Spanish 6", firstSemester: "Full year / first semester", secondSemester: "n/a", thirdTrimester: "n/a" }
			//   ],
		}, () => {
			this.parseCandidateData(() => {
				this.getResumeValues();
			});
		});

		// Make sure document exists
		this.db.collection('responseIDs').doc(this.props.qualtricsUserId + '_tier' + this.props.tierNumber).set({});

		// Track app start time
		this.setState({
			appStartTime: moment().tz("America/New_York")
		});

		// Try tracking when page is refreshed or navigated away
		window.addEventListener('pagehide', (event) => {
			event.preventDefault();
			console.log('pagehide...');
			const currTime = moment().tz("America/New_York")

			// If a section is still opened, record its active time
			if (this.state.activeSection) {
				this.recordActivity(
					"collapsibleTime",
					this.state.activeSection,
					currTime.diff(this.state.activeStartTime, 'milliseconds') + " msec spent on " + this.state.activeSection + " section"
				);
			}

			// Record total time spent on app
			this.recordActivity(
				"appTime",
				"accessed",
				currTime.diff(this.state.appStartTime, 'milliseconds') + " msec spent on app"
			);

			// Record click activity
			this.recordActivity("unloading", "accessed", "App unmounted");
		}, true);
	}

	componentWillUnmount() {
		console.log('componentWillUnmount from Resume.js');
	}

	/** The first resume has randomly-decided values. Decide them and put into state. */
	getResumeValues() {
		let applicant = this.state.applicants[this.state.applicantNumber - 1];
		let tiers = this.state.tiers[convertToFirebaseNumber(this.state.tierNumber, this.state.applicantNumber)];
		/*BK: INSERT FIREBASE DATA HERE. PART1*/
		/* values on the right are being held in key on the left  */
		this.setState(
			{
				personal_address: applicant.a_personal_address, 
				name: applicant.a_personal_legal_name,
				citizenship: applicant.b_demographics_citizenship,
				gender: applicant.b_demographics_gender,
				hispanic: applicant.b_demographics_hispanic,
				racial: applicant.b_demographics_racial,
				fedu: applicant.c_family_fedu,
				medu: applicant.c_family_medu,
				gpa: tiers.d_gpa, 
				courses_taken: parseList(tiers.d_courses_taken),
				sat_rw: tiers.e_sat_rw,
				sat_math: tiers.e_sat_math,
				ap_subject1: tiers.e_ap_subject1,
				ap_subject2: tiers.e_ap_subject2,
			}
		);
	}

	componentDidUpdate(prevProps, prevState) {
		// Record amount of time spent on active section
		if (prevState.activeSection && prevState.activeSection !== this.state.activeSection) {
			const currTime = moment().tz("America/New_York")

			this.recordActivity(
				"collapsibleTime",
				prevState.activeSection,
				currTime.diff(prevState.activeStartTime, 'milliseconds') + " msec spent on " + prevState.activeSection + " section"
			);
		}
	}

	/** Called when a section is toggled open/closed */
	// TODO(bkbyun): Change these values.
	collapsibleToggled(eventKey) {
		if (this.state[eventKey + "SectionOpened"]) {  // if clicked on the section to open, start tracking time spent
			this.setState({
				activeSection: eventKey,
				activeStartTime: moment().tz("America/New_York")
			});
		} else {  // if clicked on the section to close, clear active section
			this.setState({
				activeSection: undefined,
				activeStartTime: undefined
			})
		}

		this.recordActivity(
			"collapsibleToggled",
			eventKey,
			(this.state[eventKey + "SectionOpened"] ? "opened" : "closed") + " " + eventKey + " section"
		);
	}

	/** Fetches the candidate data from the database and stores it in state */
	parseCandidateData(callbackFunc) {
		const applicantData = this.db.collection("Applicants");
		const tierData = this.db.collection("Tiers");
		const applicants = [];
		const tiers = [];

		tierData
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					tiers.push(doc.data());
				});
			})
			.then(() => {
				this.setState(
					{
						tiers: tiers,
					}
				);
			})
			.catch((error) => {
				console.error("Error getting tiers: ", error);
			})
		applicantData
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					applicants.push(doc.data());
				});
			})
			.then(() => {
				// Set to state and call callback
				this.setState(
					{
						applicants: applicants,
					},
					callbackFunc
				);
			})
			.catch((error) => {
				console.error("Error getting applicants:", error);
			});
	}

	/** Helper function: append a new position to the positionList */
	addPositionToList(newPosition) {
		this.setState((prevState) => ({
			positionList: [...prevState.positionList, newPosition],
		}));
	}

	/** Runs when the user moves the mouse */
	_onMouseMove(e) {
		// this.recordActivity("mouse", `(${e.clientX},${e.clientY})`, "moved mouse");
	}

	/** https://pdf2png.com/ */
	render() {
		let hsprofile_url = getApplicationComponentUrl("1_hsprofile", "profile_app" + this.state.applicantNumber);
		let transcript_url = getApplicationComponentUrl("2_transcripts", "transcript_t" + this.state.tierNumber + "_app" + this.state.applicantNumber);
		let activities_url = getApplicationComponentUrl("3_activities", "activities_t" + this.state.tierNumber + "_app" + this.state.applicantNumber);
		let essay_url = getApplicationComponentUrl("4_essay", "essay_app" + this.state.applicantNumber);

		// If our data hasn't loaded yet, show a loading screen
		if (
			!(
				this.state.name
			)
		) {
			return <h1>Loading...</h1>;
		}

		return (
			<div className="overall">
				<div className="App" onMouseMove={this._onMouseMove.bind(this)}>
					<div className="resume">
						<div>
							<div className="header">
								<span style={{ fontWeight: "bold" }}>Applicant #{this.state.applicantNumber}</span>: <span>Engineering Undeclared</span>
							</div>
							<div className="header" style={{ marginTop: '20px' }}>Student Information</div>
							<p className="content" style={{ fontWeight: "bold" }}>Personal Information</p>
							<p className="content">
								Legal name: {this.state.name}
							</p>
							<p className="content">Permanent home address: {this.state.personal_address}</p>
							<p className="content" style={{ marginTop: '12px', marginBottom: '12px' }}></p> {/*to insert slight line*/}
							<p className="content" style={{ fontWeight: "bold" }}>Demographics</p>
							<p className="content">Gender: {this.state.gender}</p>
							<p className="content">Citizenship status: {this.state.citizenship}</p>
							<p className="content">Hispanic/Latino/a/x: {this.state.hispanic}</p>
							<p className="content">Racial identity: {this.state.racial}</p>
							<p className="content" style={{ marginTop: '12px', marginBottom: '12px' }}></p>
							<p className="content" style={{ fontWeight: "bold" }}>Family</p>
							<p className="content">Father’s education: {this.state.fedu}</p>
							<p className="content">Mother’s education: {this.state.medu}</p>
						</div>
						<div className="section">
						<div className="header" style={{ marginTop: '20px' }}>Education</div>
						{/* confirm with Mike} <p className="content">Secondary/high school: {this.state.secondarySchool}</p> */}
						</div>
						<div className="section">
							{/* confirm with Mike} <div className="content" style={{ marginTop: '12px', fontWeight: "bold" }}>Grades</div> */}
							<div className="content" style={{ fontWeight: "bold" }}>Grades</div> 
							<p className="content">Cumulative GPA: {this.state.gpa}</p>
							{/* confirm with Mike}
							<p className="content">Unweighted GPA: {this.state.unweightedGPA}</p>
							<p className="content">Weighted GPA: {this.state.weightedGPA} (*calculated by adding .5 points for honors classes and 1 point for AP classes)</p>
							<p className="content">Honors/AP classes: {this.state.honorsAPClasses}</p> */}
						</div>
						<div className="section">
							<div className="content" style={{ marginTop: '12px', fontWeight: "bold" }}>Courses taken in current or most recent year</div>
							<table className="course-table">
								<thead>
								</thead>
								<tbody>
									{this.state.courses_taken.map((course) => (
										<tr key={course}>
											<td className="courses_taken_style underline">{course}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="section">
							<div className="header" style={{ marginTop: '20px' }}>Testing</div>
							<p className="content" style={{ fontWeight: "bold" }}>SAT</p>
							{(this.state.sat_rw || this.state.sat_math) ?
							<div>
								<p className="content">Evidence-Based Reading and Writing: {this.state.sat_rw}</p>
								<p className="content">Mathematics: {this.state.sat_math}</p>
							</div> :
							<p className="content">Not Submitted</p>}
							<p className="content" style={{ fontWeight: "bold" }}>AP</p>
							<p className="content"> {this.state.ap_subject1}</p>
							<p className="content"> {this.state.ap_subject2}</p>
						</div>
						<Accordion>
							{/* High School Profile Section */}
							<Card>
								<Card.Header
									style={{
										background: "white",
										paddingLeft: 0,
										paddingRight: 0,
									}}
								>
									<Accordion.Toggle
										as={Button}
										style={{
											color: "black",
											width: "100%",
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-between",
											fontSize: "18px",
											alignItems: "center",
										}}
										variant="link"
										eventKey="0"
										onClick={() =>
											this.setState(
												{
													hsprofileSectionOpened:
														!this.state.hsprofileSectionOpened,
												},
												() => {
													this.collapsibleToggled("hsprofile");
													if (this.state.hsprofileSectionOpened) {
														// Mark the other sections as closed
														this.setState({
															transcriptSectionOpened: false,
															activitiesSectionOpened: false,
															essaySectionOpened: false,
														});
													}
												}
											)
										}
									>
										High School Profile{" "}
										<img
											id="toggle_icon"
											src={
												this.state.hsprofileSectionOpened
													? imageToURL("minus_icon")
													: imageToURL("plus_icon")
											}
											alt="toggle icon"
										/>
									</Accordion.Toggle>
								</Card.Header>

    							<Accordion.Collapse eventKey="0" style={{ marginTop: 0 }}>
									<Card.Body>
										{/* <img src={hsprofile_url} className="image_togglefit" alt="High School Profile"></img> */}
										<img src={hsprofile_url} className="hsprofile-picture" alt="High School Profile"></img>
									</Card.Body> 
								</Accordion.Collapse>
							</Card>

							{/* Transcript Section */}
							<Card>
								<Card.Header
									style={{
										background: "white",
										paddingLeft: 0,
										paddingRight: 0,
										borderTop: "1px solid black",
									}}
								>
									<Accordion.Toggle
										as={Button}
										style={{
											color: "black",
											width: "100%",
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-between",
											fontSize: "18px",
											alignItems: "center",
										}}
										variant="link"
										eventKey="1"
										onClick={() =>
											this.setState(
												{
													transcriptSectionOpened: !this.state.transcriptSectionOpened,
												},
												() => {
													this.collapsibleToggled("transcript");
													if (this.state.transcriptSectionOpened) {
														this.setState({
															// Mark the other sections as closed
															hsprofileSectionOpened: false,
															activitiesSectionOpened: false,
															essaySectionOpened: false,
														});
													}
												}
											)
										}
									>
										Transcript{" "}
										<img
											id="toggle_icon"
											src={
												this.state.transcriptSectionOpened
													? imageToURL("minus_icon")
													: imageToURL("plus_icon")
											}
											alt="toggle icon"
										/>
									</Accordion.Toggle>
								</Card.Header>

								{/* Position List */}
								<Accordion.Collapse eventKey="1">
									<Card.Body>
										<img src={transcript_url} className="image_togglefit" alt="Transcript"></img>
									</Card.Body>
								</Accordion.Collapse>
							</Card>

							{/* Activities Section */}
							<Card>
								<Card.Header
									style={{
										background: "white",
										paddingLeft: 0,
										paddingRight: 0,
										borderTop: "1px solid black",
									}}
								>
									<Accordion.Toggle
										as={Button}
										style={{
											color: "black",
											width: "100%",
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-between",
											fontSize: "18px",
											alignItems: "center",
										}}
										variant="link"
										eventKey="2"
										onClick={() =>
											this.setState(
												{
													activitiesSectionOpened: !this.state.activitiesSectionOpened,
												},
												() => {
													this.collapsibleToggled("activities");
													if (this.state.activitiesSectionOpened) {
														// Mark the other sections as closed
														this.setState({
															hsprofileSectionOpened: false,
															transcriptSectionOpened: false,
															essaySectionOpened: false,
														});
													}
												}
											)
										}
									>
										Activities {" "}
										<img
											id="toggle_icon"
											src={
												this.state.activitiesSectionOpened
													? imageToURL("minus_icon")
													: imageToURL("plus_icon")
											}
											alt="toggle icon"
										/>
									</Accordion.Toggle>
								</Card.Header>

								<Accordion.Collapse eventKey="2">
									<Card.Body>
										<img src={activities_url} className="image_togglefit" alt="Transcript"></img>
									</Card.Body>
								</Accordion.Collapse>
							</Card> 

							{/* Personal Essay Section */}
							<Card>
								<Card.Header
									style={{
										background: "white",
										paddingLeft: 0,
										paddingRight: 0,
										borderTop: "1px solid black",
									}}
								>
									<Accordion.Toggle
										as={Button}
										style={{
											color: "black",
											width: "100%",
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-between",
											fontSize: "18px",
											alignItems: "center",
										}}
										variant="link"
										eventKey="3"
										onClick={() =>
											this.setState(
												{
													essaySectionOpened: !this.state.essaySectionOpened,
												},
												() => {
													this.collapsibleToggled("essay"); /*bkcheck*/
													if (this.state.essaySectionOpened) {
														this.setState({
															// Mark the other sections as closed
															hsprofileSectionOpened: false,
															transcriptSectionOpened: false,
															activitiesSectionOpened: false,
														});
													}
												}
											)
										}
									>
										Personal Essay{" "}
										<img
											id="toggle_icon"
											src={
												this.state.essaySectionOpened
													? imageToURL("minus_icon")
													: imageToURL("plus_icon")
											}
											alt="toggle icon"
										/>
									</Accordion.Toggle>
								</Card.Header>

								{/* Position List */}
								<Accordion.Collapse eventKey="3">
									<Card.Body>
										<img src={essay_url} className="image_togglefit" alt="Transcript"></img>
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
					</div>
				</div>
			</div>
		);
	}
}

/**
 * Turns an image name into the src, relative to /public/images. Image should be a png.
 */
export function imageToURL(imageName) {
	return `${process.env.PUBLIC_URL}/images/${imageName}.png`;
}

export function getApplicationComponentUrl(dir, imageName) {
	return `${process.env.PUBLIC_URL}/application_components/${dir}/${imageName}.png`;
}

export function convertToFirebaseNumber(tierNumber, applicantNumber) {
	return (tierNumber - 1) * 4 + (applicantNumber - 1); 
}

export function parseList(commaSeparatedString) {
	return commaSeparatedString.split(", ");
}
