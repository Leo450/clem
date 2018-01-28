<?php

// DEFINES
define("QUOTES_FILENAME", "quotes.json");
define("ADMIN_KEYWORD", "mescouilles");


// FUNCTIONS
function redirect($is_admin = false)
{

	header("Location:/" . (($is_admin) ? ADMIN_KEYWORD: ""));

}



// ---------------------------------------
// ---------------------------------------
// ---------------------------------------



// QUOTES
$quotes_data = json_decode(file_get_contents(QUOTES_FILENAME));

// URI
$uri_params = explode("/", $_SERVER["REQUEST_URI"]);
if($uri_params[0] === ""){
	array_shift($uri_params);
}

$is_admin = isset($uri_params[0]) && $uri_params[0] === ADMIN_KEYWORD;
$action = ($is_admin) ? $uri_params[1] : $uri_params[0];
$params = array_slice($uri_params, ($is_admin) ? 2 : 1);

// DISPATCHER
if($is_admin){

	// ADMIN CONTROLLER
	switch($action){
		case "delete":

			if(isset($params[0]) && is_numeric($params[0])){
				$quote_index = (int)$params[0];
				array_splice($quotes_data->quotes, $quote_index, 1);
				file_put_contents(QUOTES_FILENAME, json_encode($quotes_data));
			}

			redirect(true);

			break;
	}

}

// FRONT CONTROLLER
switch($action){
	case "add":

		if(isset($_POST["new_quote"]) && !empty($_POST["new_quote"])){
			array_unshift($quotes_data->quotes, $_POST["new_quote"]);
			file_put_contents(QUOTES_FILENAME, json_encode($quotes_data));
		}

		redirect($is_admin);

		break;
}

?>

<!doctype html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport"
	      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Clement</title>

	<link rel="stylesheet" href="lib/bootstrap-grid-only/css/grid12.css">
	<link rel="stylesheet" href="css/style.css">

</head>
<body>

	<div class="container hidden-container">

		<div class="row">
			<div class="col-xs-9">

				<div class="sentence-form">

					<form action="<?php if($is_admin){ echo "/" . ADMIN_KEYWORD; } ?>/add" method="post">
						<input type="text" name="new_quote">
						<button type="submit">Oyeah</button>
					</form>

				</div>

				<?php foreach($quotes_data->quotes as $quote_index => $quote){ ?>

					<div>
						<?php echo $quote; ?>
						<?php if($is_admin){ ?>
							<a href="/mescouilles/delete/<?php echo $quote_index; ?>">x</a>
						<?php } ?>
					</div>

				<?php } ?>
				<?php foreach($quotes_data->quotes as $quote_index => $quote){ ?>

					<div>
						<?php echo $quote; ?>
						<?php if($is_admin){ ?>
							<a href="/mescouilles/delete/<?php echo $quote_index; ?>">x</a>
						<?php } ?>
					</div>

				<?php } ?>
				<?php foreach($quotes_data->quotes as $quote_index => $quote){ ?>

					<div>
						<?php echo $quote; ?>
						<?php if($is_admin){ ?>
							<a href="/mescouilles/delete/<?php echo $quote_index; ?>">x</a>
						<?php } ?>
					</div>

				<?php } ?>
				<?php foreach($quotes_data->quotes as $quote_index => $quote){ ?>

					<div>
						<?php echo $quote; ?>
						<?php if($is_admin){ ?>
							<a href="/mescouilles/delete/<?php echo $quote_index; ?>">x</a>
						<?php } ?>
					</div>

				<?php } ?>
			</div>
		</div>

	</div>

	<div class="container main-container">

	<div class="row fit-h">

		<div class="col-xs-3 fit-h">
			<img class="img-clement" src="img/clement.png">
		</div>
		<div class="col-xs-9 fit-h">
			<div class="sentences-container fit-h">
				<div class="sentences-scroll-wrapper">

					<div class="sentence sentence-form">

						<form action="<?php if($is_admin){ echo "/" . ADMIN_KEYWORD; } ?>/add" method="post">
							<input type="text" name="new_quote">
							<button type="submit">> TOUT DEDANS <</button>
						</form>

					</div>

					<?php foreach($quotes_data->quotes as $quote_index => $quote){ ?>

						<div class="sentence">
							<?php echo $quote; ?>
							<?php if($is_admin){ ?>
								<a href="/mescouilles/delete/<?php echo $quote_index; ?>">x</a>
							<?php } ?>
						</div>

					<?php } ?>
					<?php foreach($quotes_data->quotes as $quote_index => $quote){ ?>

						<div class="sentence">
							<?php echo $quote; ?>
							<?php if($is_admin){ ?>
								<a href="/mescouilles/delete/<?php echo $quote_index; ?>">x</a>
							<?php } ?>
						</div>

					<?php } ?>
					<?php foreach($quotes_data->quotes as $quote_index => $quote){ ?>

						<div class="sentence">
							<?php echo $quote; ?>
							<?php if($is_admin){ ?>
								<a href="/mescouilles/delete/<?php echo $quote_index; ?>">x</a>
							<?php } ?>
						</div>

					<?php } ?>
					<?php foreach($quotes_data->quotes as $quote_index => $quote){ ?>

						<div class="sentence">
							<?php echo $quote; ?>
							<?php if($is_admin){ ?>
								<a href="/mescouilles/delete/<?php echo $quote_index; ?>">x</a>
							<?php } ?>
						</div>

					<?php } ?>

				</div>
			</div>
		</div>

	</div>

</div>

	<script src="lib/jquery/jquery-3.3.1.min.js"></script>
	<script src="lib/jquery/jquery-ui.js"></script>
	<script src="js/main.js"></script>

</body>
</html>
