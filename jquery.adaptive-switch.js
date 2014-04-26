(function(){
	var template =
		'<div class="adaptive-switch{{wrapper_class}}">'+
			'<div class="switch-inner">'+
				'<div class="switch-size">'+
					'<div class="switch-size-inner">'+
						'<div class="switch-label switch-label-left"><span>{{biggest_text}}</span></div>'+
					'</div>'+
					'<div class="switch-size-cover"></div>'+
				'</div>'+
				'<div class="switch-dot"><img src="{{img_src_1x1}}" /></div>'+
				'<div class="switch-switcher">'+
					'<label for="{{id_right}}" class="switch-label switch-label-right"><span>{{switch_right}}</span></label>'+
					'<label for="{{id_left}}"  class="switch-label switch-label-left" ><span>{{switch_left}}</span></label>'+
					'<div class="clear"></div>'+
				'</div>'+
			'</div>'+
		'</div>';

	var img_src_1x1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCB1jYAAAAAIAAc/INeUAAAAASUVORK5CYII=';

	function renderTemplate(switchLeft, switchRight, isRight, inputLeftId, inputRightId) {
		switchLeft  = String(switchLeft);
		switchRight = String(switchRight);

		return template
			.split('{{switch_left}}'    ).join(switchLeft)
			.split('{{switch_right}}'   ).join(switchRight)
			.split('{{biggest_text}}'   ).join(switchLeft.length > switchRight.length ? switchLeft : switchRight)
			.split('{{id_left}}'        ).join(inputLeftId)
			.split('{{id_right}}'       ).join(inputRightId)
			.split('{{img_src_1x1}}'    ).join(img_src_1x1)
			.split('{{wrapper_class}}'  ).join(isRight ? ' switch-right' : '');
	}

	{
		var increment = 0;

		function getUniqueId() {
			return 'switch--'+ (++increment);
		}
	}

	jQuery.fn.adaptiveSwitch = function() {
		var $ = jQuery;

		this.filter('input[type="checkbox"]').each(function(){
			var $this = $(this);

			if (!$this.attr('id')) {
				$this.attr('id', getUniqueId());
			}

			var switchId = getUniqueId();

			$(
				renderTemplate(
					$this.attr('data-switch-left')  ? $this.attr('data-switch-left')  : 'No',
					$this.attr('data-switch-right') ? $this.attr('data-switch-right') : 'Yes',
					$this.prop('checked'),
					$this.attr('id'),
					$this.attr('id')
				)
			)
				.attr('id', switchId)
				.addClass('switch-checkbox')
				.addClass('input-id--'+ $this.attr('id'))
				.insertAfter($this);

			$this
				.attr('data-switch-id', switchId)
				.on('change', function(){
					$('#'+ $(this).attr('data-switch-id') )[ $(this).prop('checked') ? 'addClass' : 'removeClass' ]('switch-right');
				})
				.hide();
		});

		return this;
	};
})();
