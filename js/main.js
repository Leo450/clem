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

function scrollSentencesWrapper()
{

	var scrollWrapperOffsetTop = -1 * $(document).scrollTop();

	$('.sentences-scroll-wrapper').css("top", scrollWrapperOffsetTop + "px");

}

function resetSentencesStyle()
{

	$('.sentence')
		.removeClass("main")
		.css("opacity", .7);

}

function getSentenceOffsetTop($sentence)
{

	return $sentence.offset().top - $(document).scrollTop();

}

function setSentencesAppleStyle()
{

	var $mainSentence = null;

	var minSentenceOffsetMouthAbs = maxSentenceOffsetMouth;

	$('.sentence').each(function(){

		var sentenceOffsetMouthAbs = Math.abs(mouthOffsetTop - getSentenceOffsetTop($(this)));

		var newOpacity = .1;
		if(sentenceOffsetMouthAbs < maxSentenceOffsetMouth){

			newOpacity += .4 * (1 - sentenceOffsetMouthAbs / maxSentenceOffsetMouth);

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

	var $mainSentence = null;

	var minSentenceOffsetMouthAbs = maxSentenceOffsetMouth;

	$('.sentence').each(function(){

		var sentenceOffsetMouthAbs = Math.abs(mouthOffsetTop - getSentenceOffsetTop($(this)));

		var newOpacity = .1;
		if(sentenceOffsetMouthAbs < maxSentenceOffsetMouth){

			newOpacity += .4 * (1 - sentenceOffsetMouthAbs / maxSentenceOffsetMouth);

			if(sentenceOffsetMouthAbs < minSentenceOffsetMouthAbs){

				minSentenceOffsetMouthAbs = sentenceOffsetMouthAbs;
				$mainSentence = $(this);

			}

		}

		$(this).css("opacity", newOpacity);

	});

	$mainSentence.addClass("main");

	var mainSentenceOffsetTop = $mainSentence.offset().top - $(document).scrollTop();
	var scrollCorrection = mouthOffsetTop - mainSentenceOffsetTop;

	var $sentenceScrollWrapper = $('.sentences-scroll-wrapper');
	$sentenceScrollWrapper.stop(true, true).animate({top: parseFloat($sentenceScrollWrapper.css("top")) + scrollCorrection + "px"}, 500);

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

	unbindScroll();

	resetSentencesStyle();

	$(document).scrollTop($(document).scrollTop() + sentencesOffset);

	var $sentenceScrollWrapper = $('.sentences-scroll-wrapper');
	$sentenceScrollWrapper.stop(true, true).animate({top: parseFloat($sentenceScrollWrapper.css("top")) - sentencesOffset + "px"}, 1000, "easeInOutCubic");

	setTimeout(function(){

		bindScroll();
		lockSentencesStyle();

	}, 800);

}

function bindScroll()
{

	$(document).on("scroll", function(){

		scrollSentencesWrapper();

		resetSentencesStyle();

		setSentencesAppleStyle();

		debounce(lockSentencesStyle, 300)();

	});

}

function unbindScroll()
{

	$(document).unbind("scroll");

}




const $imgClement = $('.img-clement');
const mouthOffsetTop = $imgClement.offset().top - $(document).scrollTop() + $imgClement.height() / 12;
const maxSentenceOffsetMouth = $(window).height() / 4;

$(document).ready(function(){

	$('.sentences-scroll-wrapper, .hidden-container')
		.css("padding-top", mouthOffsetTop + "px")
		.css("padding-bottom", $(window).height() - mouthOffsetTop + "px");

	bindScroll();

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