(function($) {
	$(document).ready( function() {
		$( document.body ).on( 'click', '.simple-payments-add-product', function( event ) {
			event.preventDefault();
			var root = $( this ).closest( '.simple-payments' );
			root.find( '.simple-payments-product-list input[type="radio"]' ).prop( 'checked', false );
			root.find( '.simple-payments-product-list' ).hide();
			root.find( '.simple-payments-form' ).show()
				.find( '.field-name' ).prop( 'disabled', false );
			// TODO: Reset fields
		} );

		$( document.body ).on( 'click', '.simple-payments-edit-product', function( event ) {
			event.preventDefault();
			$( this ).closest( 'label' ).click();
			var root = $( this ).closest( '.simple-payments' );
			root.find( '.simple-payments-product-list' ).hide();
			root.find( '.simple-payments-form' ).show()
				.find( '.field-name' ).prop( 'disabled', false );
			// TODO: Populate fields
		} );

		$( document.body ).on( 'click', '.simple-payments-back-product-list', function( event ) {
			event.preventDefault();
			var root = $( this ).closest( '.simple-payments' );
			root.find( '.simple-payments-form' ).hide()
				.find( '.field-name' ).prop( 'disabled', true );
			root.find( '.simple-payments-product-list' ).show();
		} );

		$( document.body ).on( 'click', '.simple-payments-remove-image', function( event ) {
			event.preventDefault();
			var root = $( this ).closest( '.simple-payments-form' );
			var imageContainer = root.find( '.simple-payments-image' );
			root.find( '.simple-payments-image-fieldset .placeholder' ).show();
			imageContainer.find( 'img, input[type=hidden]' ).remove();
			imageContainer.hide();
		} );

		$( document.body ).on( 'click', '.simple-payments-image-fieldset .placeholder, .simple-payments-image > img', function( event ) {
			var root = $( this ).closest( '.simple-payments-form' );
			var imageContainer = root.find( '.simple-payments-image' );

			event.preventDefault();
			var frame = new wp.media.view.MediaFrame.Select({
				title: 'Choose Product Image', // TODO: i18n

				// Enable/disable multiple select
				multiple: false,

				// Library WordPress query arguments.
				library: {
					type: 'image',
				},

				button: {
					text: 'Choose Image'
				}
			});

			// Fires when a user has selected attachment(s) and clicked the select button.
			// @see media.view.MediaFrame.Post.mainInsertToolbar()
			frame.on( 'select', function() {
				var selection = frame.state().get('selection').first().toJSON();

				// First, make sure that we have the URL of an image to display
				if ( 0 > $.trim( selection.url.length ) ) {
					return;
				}

				root.find( '.simple-payments-image-fieldset .placeholder' ).hide();

				imageContainer.find( 'img, input[type=hidden]' ).remove();
				imageContainer.show()
					.append( $( '<img/>', {
						src: selection.url,
						alt: selection.caption,
						title: selection.title,
					} ) )
					.append( $( '<input/>', {
						type: 'hidden',
						name: imageContainer.data( 'image-field' ),
						value: selection.id,
					} ) );


			} );

			// Open the modal.
			frame.open();
		});
	});
})(jQuery);
