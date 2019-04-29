import React from 'react';
import axios from 'axios';
import '../styles/images_page.css';

class ImagesPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: "",
			images: []
		}
	}

	componentDidMount() {
		axios.get("/api/images/getAll")
			.then((res) => {
				console.log(res.data);
				this.setState({ images: res.data });
			})
			.catch((err) => console.log(err));
	}

	handleFilterChange = (e) => {
		this.setState({ filter: e.target.value });
	}

	render() {
		const { images, filter } = this.state;
		const filteredImages = images.filter(image => image.name.indexOf(filter) !== -1);
		// const filteredImages = images;
		return (
			<div className="imagesPage">
				<h2>All Experiment Images</h2>
				<h4>Search through all images based on title!</h4>
				<input type="text" name="filter" placeholder="Search..." onChange={this.handleFilterChange}/>
				<ul className="imageList">
					{(filteredImages.length > 0) && filteredImages.map((image) => (
						<li key={image.imageId} className="imageListItem">
							<img src={image.filepath} alt={image.name} />
							<div className="textArea">
								<p>{image.name}</p>
								<p>{image.timestamp}</p>
							</div>
						</li>
					))}
					{(filteredImages.length === 0) && <h5>No images found!</h5>}
				</ul>
			</div>
		);
	}
}

export default ImagesPage;