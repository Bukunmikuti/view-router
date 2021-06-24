
let embedTransition;
export default embedTransition = () => {
	let head = document.head
	let style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode(css));
	head.appendChild(style);
}


var css = `
.v-router.fadein {
	animation: fadein 0.35s ease-in forwards;
}

@keyframes fadein {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.v-router.fadeInTop {
	animation: fadeinTop 0.35s ease-in-out forwards;
}

@keyframes fadeinTop {
	from {
		transform: translate(0, -30%);
		opacity: 0;
	}
	to {
		transform: translate(0, 0);
		opacity: 1;
	}
}

.v-router.fadeInBottom {
	animation: fadeinBottom 0.35s ease-in-out forwards;
}

@keyframes fadeinBottom {
	from {
		transform: translate(0, 30%);
		opacity: 0;
	}
	to {
		transform: translate(0, 0);
		opacity: 1;
	}
}

.v-router.scaleIn {
	animation: scale-in 0.2s linear forwards;
}

@keyframes scale-in {
		from {
			transform: scale(0.8, 0.8);
			opacity: 0;
		}
		to {
			transform: scale(1, 1);
			opacity: 1;
		}
	}

	.v-router.fadeInRight {
		animation: fadeInRight 0.35s ease-in-out forwards;
	}

@keyframes fadeInRight {
	from {
		transform: translateX(40%);
		opacity: 0;
	}
	to {
		transform: translateX(0);
		opacity: 1;
	}
}

	.v-router.fadeInLeft {
		animation: fadeinLeft 0.35s ease-in-out forwards;
	}

@keyframes fadeinLeft {
	from {
		transform: translateX(-40%);
		opacity: 0;
	}
	to {
		transform: translateX(0);
		opacity: 1;
	}
}
`