<template>
  <div id="app">
    <div class="row">
				<hr>
			</div>
			<div class="row content">
				<div class="col-md-12">
					<div class="button-wrapper btn-container-col-center" style="flex-direction: column;align-items: center;">
						<a class="btn btn-lg btn-success" href="/patient/login">Patient<span class="glyphicon glyphicon-align-center"></span></a>
						<a class="btn btn-lg btn-success" href="/doctor/login">Doctor<span class="glyphicon glyphicon-align-center"></span></a>
						<a class="btn btn-lg btn-success" href="/admin/login">Admin<span class="glyphicon glyphicon-align-center"></span></a>
					</div>
				</div>
			</div>
  </div>
</template>
<style scoped>
.button-wrapper .btn {
	margin: 20px 0px;
}
.button-wrapper {
	display: flex;
    flex-flow: column wrap;
	justify-content: space-around;
}
</style>