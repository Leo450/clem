var debounceTimer;
function debounce(callback, delay){

	return function(){
		var args = arguments;
		var context = this;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(function(){
			callback.apply(context, args);
		}, delay)
	}
}







function getSentenceOffsetTop($sentence)
{

	return $sentence.offset().top - $(document).scrollTop();

}

function scrollSentencesWrapper()
{

	var scrollWrapperOffsetTop = -1 * $(document).scrollTop();

	$('.sentences-scroll-wrapper').css("top", scrollWrapperOffsetTop + "px");

}



function enableOpacityTransition()
{

	$('.sentences-container').addClass("transition");

}

function disableOpacityTransition()
{

	$('.sentences-container').removeClass("transition");

}

function resetSentencesStyle()
{

	$('.sentence')
		.removeClass("main");

}

function setSentencesAppleStyle(min, toAdd)
{

	var $mainSentence = null;

	var minSentenceOffsetMouthAbs = maxSentenceOffsetMouth;

	$('.sentence').each(function(){

		var sentenceOffsetMouthAbs = Math.abs(mouthOffsetTop - getSentenceOffsetTop($(this)));

		var newOpacity = min;
		if(sentenceOffsetMouthAbs < maxSentenceOffsetMouth){

			newOpacity += toAdd * (1 - sentenceOffsetMouthAbs / maxSentenceOffsetMouth);

			if(sentenceOffsetMouthAbs < minSentenceOffsetMouthAbs){

				minSentenceOffsetMouthAbs = sentenceOffsetMouthAbs;
				$mainSentence = $(this);

			}

		}

		$(this).css("opacity", newOpacity);

	});

	return $mainSentence;

}

function lockSentencesStyle()
{

	disableScroll();

	enableOpacityTransition();

	$('.quote-marker').css("opacity", 0);

	var $mainSentence = setSentencesAppleStyle(.1, .4);

	$mainSentence.addClass("main");

	var mainSentenceOffsetTop = $mainSentence.offset().top - $(document).scrollTop();
	var scrollCorrection = mouthOffsetTop - mainSentenceOffsetTop;

	var $sentenceScrollWrapper = $('.sentences-scroll-wrapper');
	$sentenceScrollWrapper.stop(true, true).animate({top: parseFloat($sentenceScrollWrapper.css("top")) + scrollCorrection + "px"}, 500);

	setTimeout(enableScroll, 500);

}

function goToSentence($sentence)
{

	var $mainSentence = $('.sentence.main');

	var sentencesOffset = 0;

	if($mainSentence.length){

		sentencesOffset = getSentenceOffsetTop($sentence) - getSentenceOffsetTop($mainSentence);
		if($sentence.index() > $mainSentence.index()){
			sentencesOffset -= parseFloat($mainSentence.css("padding-bottom")) * 2;
		}

	}else{
		sentencesOffset = getSentenceOffsetTop($sentence) - mouthOffsetTop;
	}

	disableScroll();

	resetSentencesStyle();

	$(document).scrollTop($(document).scrollTop() + sentencesOffset);

	var $sentenceScrollWrapper = $('.sentences-scroll-wrapper');
	$sentenceScrollWrapper.stop(true, true).animate({top: parseFloat($sentenceScrollWrapper.css("top")) - sentencesOffset + "px"}, 1000, "easeInOutCubic");

	setTimeout(function(){

		enableScroll();
		lockSentencesStyle();

	}, 800);

}

function enableScroll()
{

	$('body').css("overflow", "auto");

	$(document).on("scroll", function(){

		$('.quote-marker').css("opacity", 1);

		disableOpacityTransition();

		resetSentencesStyle();

		scrollSentencesWrapper();

		setSentencesAppleStyle(.1, .9);

		debounce(lockSentencesStyle, 300)();

	});

}

function disableScroll()
{

	$('body').css("overflow", "hidden");

	$(document).unbind("scroll");

}




const $imgClement = $('.img-clement');
const mouthOffsetTop = $imgClement.offset().top - $(document).scrollTop() + $imgClement.height() / 12;
const maxSentenceOffsetMouth = $(window).height() / 4;

$(document).ready(function(){

	$('.sentences-scroll-wrapper, .hidden-container')
		.css("padding-top", mouthOffsetTop + "px")
		.css("padding-bottom", $(window).height() - mouthOffsetTop + "px");

	$('.quote-marker').css("top", "calc(" + mouthOffsetTop + "px + .8em)");

	enableScroll();

	$('.sentence').click(function(){

		if(!$(this).hasClass("main")){
			goToSentence($(this));
		}

	});

	$('.img-clement').click(function(){

		if(!$('.sentence-form').hasClass(".main")){
			goToSentence($('.sentence-form'));
		}

	});

	goToSentence($('.sentence:nth-child(2)'));

});
