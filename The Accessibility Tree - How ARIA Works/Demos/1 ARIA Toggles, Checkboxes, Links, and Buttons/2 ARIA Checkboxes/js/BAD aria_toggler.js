/*!
IMPORTANT: THIS MODULE VERSION IS MODIFIED TO PRESENT THE BAD ARIA DEMO FOR CSUN2015, DO NOT USE FOR ANY OTHER PURPOSE.
	*/

(function(){

	$A.Toggle = function(trigger, config){
		var config = config || {}, t = typeof trigger === 'string' ? $A.getEl(trigger) : trigger, that = this,
			isCheckbox = $A.getAttr(t, 'role') == 'checkbox' ? true : false, sraText = $A.createEl('span', null, $A.sraCSS);

		if (!config.noToggle && config.noARIA){
			if (!config.roleText)
				config.roleText = 'Toggle';

			if (!config.stateText)
				config.stateText = 'Pressed';

			t.appendChild(sraText);
		}

		var toggle = function(state){
			var cr = true;

			if (config.callback && typeof config.callback === 'function')
				cr = config.callback.apply(t, [state]);

			if (cr){
				if (!config.noToggle && config.noARIA)
					sraText.innerHTML = state
						? ('&nbsp;' + config.roleText + '&nbsp;' + config.stateText) : '&nbsp;' + config.roleText;

				else if (!config.noToggle)
					$A.setAttr(t, 'aria-checked', state ? 'true' : 'false');

				that.state = state;
			}
		};
		var nn = t.nodeName.toLowerCase();

		if (!((nn == 'input' && (t.getAttribute('type') == 'button' || t.getAttribute('type') == 'image'))
			|| (nn == 'a' && t.hasAttribute('href')) || (nn == 'button')))
			$A.setAttr(t, 'tabindex', '0');
		$A.bind(t,
						{
						keypress: function(ev){
							var k = ev.which || ev.keyCode;

							if (k == 13 || k == 32){
								ev.preventDefault();

								if (!(t.nodeName.toLowerCase() == 'input' && t.type == 'image' && k == 32))
									$A.trigger(t, 'click');
							}
						},
						click: function(ev){
							toggle.apply(t, [that.state ? false : true]) ? true : false;
							ev.preventDefault();
						}
						});
		that.set = function(state){
			toggle.apply(t, [state]);
		};

		if (!config.noToggle)
			toggle.apply(t, [config.state ? true : false]);
	};
})();