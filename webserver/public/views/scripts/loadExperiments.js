$(document).ready(function() {
	$.ajax({
		method: "GET",
		url: "localhost:3000/experiments/getAll",
		success: (data) => {
			data.forEach(experiment => {
				$(experimentList).append(`
					<li class="experiment">
							<div class="textArea">
									<h3 class="experimentId">Experiment ${experiment.experimentId}</h3>
									<h4 class="experimentName">Experiment Name: ${experiment.name}</h4>
									<p class="experimentDescription">${experiment.description}</p>
							</div>
					</li>
				`);
			});
		}
	});
});