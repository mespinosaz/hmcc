import React from 'react';

export default class Board extends React.Component {

	participants() {
		var list = []
		
		this.props.participants
			.sort((a, b) => a.count > b.count ? 1 : -1)
			.forEach(participant => {
			var participantClass = 'different-count'
			if (this.props.count === participant.count) {
				participantClass = 'current-count'
			} 

			list.push(<tr key={participant.id} className={participantClass}>
				<td>{participant.name}</td>
				<td>{participant.speed}</td>
				<td>{participant.count}</td>
				<td><button type="button" className="btn btn-outline-success">+</button></td>
				<td><button type="button" className="btn btn-outline-warning">-</button></td>
				<td><button type="button" className="btn btn-outline-danger">X</button></td>
			</tr>)
		})
				{btoa(JSON.stringify(this.props.participants))}

		return list
	}

	grid() {
		if (this.props.participants.length <= 0) {
			return "No participants in the board"
		}
		return <div>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Speed</th>
						<th>Next count</th>
						<th colSpan="3">Actions</th>
					</tr>
				</thead>
				<tbody>
					{this.participants()}
				</tbody>
			</table>
		</div>
	}

	render() {
		return (
			<div id="board">
				<h2>Count {this.props.count}</h2>
				{this.grid()}
			</div>
		);
	}
}
