
$( document ).ready(function() {

//Create
$('.calladd').click(function() {
	

	if ( $('.divAddEntity').css('display') === "none" ) {
	  ///$( "#addEntity" ).css({"display":"block"});
	  $('.divAddEntity').show()
	  $(".calladd").html('<i class="fas fa-minus"></i>')
	} else  {
	  //$( "#addEntity" ).css({"display":"none"});
	  $('.divAddEntity').hide()
	  $(".calladd").html('<i class="fas fa-plus"></i>')
	}
});


//Update

$('.editItem').click(function() {
	var itemid = $(this).attr('itemid') 
	var entity = $(this).attr('entity')
	var selected_node = $("#"+entity+"-"+itemid);

	var inputs='';

	$(selected_node).find('li').each( function(){

		key = $(this).attr('key');
		var input_type = $(this).attr('input_type')
		var verbose_content = $(this).attr('input_type')=='hidden'?'':$(this).attr('verbose_key')+": "

		if(key!=='pessoa')
			inputs+="<div class='form-group row my-0' id='"+key+"'>"+
		"<div class='col-sm-6'>"+
		"<label>"+verbose_content+"</label>"+
		"</div>"+
		"<div class='col-sm-6'>"+
		"<span class=''>"+
		"<input class='form-control' type='"+input_type+"' name='"+key+"' value='"+$(this).attr('value')+"'>"+
		"</input>"+
		"</span>"+
		"</div>"+
		"</div>";

	})
	$(selected_node).html(
		"<form name='editform' id='editform' method='post' action='/"+entity.replace("es","").replace("s","")+"/"+itemid+"'><fieldset>"
		+"<div>"+inputs+"</div>"
		+"<button type='button' class='form-group btn btn-primary btn-xs submit_edit mr-2' id='"+entity+"-"+itemid+"'  name='submit' value='submit'>Salvar</button>"
		+"<button type='button' class='form-group btn btn-primary btn-xs cancel_edit mr-2' onclick='location.reload()'  name='cancel' value='cancel'>Cancelar</button>"
		+"</fieldset></form>"
		);


	$(this).hide();

	$('button#'+entity+"-"+itemid).click(function(){
		form = $("#editform");


		if(entity=='devedor' && $("#editform").find($('input[name ="cpf_ou_cnpj"]')).val().length != 11 && 
			$("#editform").find($('input[name ="cpf_ou_cnpj"]')).val().length != 14)
		{
			$( "<small class='error-msg'>Cpf/Cnpj com número incorreto de caracteres<br /></small>" ).insertAfter( $('#editform').find($('input[name ="cpf_ou_cnpj"]')));

		}

		else{

			form.submit();
			$.ajax({ 
				type: 'POST',
				url: form.attr('action'), 
				data: form.serialize(), 
				complete: function(result) {

					if((entity=='devedor' || entity=='devedores')  && result.responseText.search("Cpf/Cnpj já adicionado")>-1)
					{	
						$('#editform').find($('input[name ="cpf_ou_cnpj"]')).css({'border-color':'red'});
						$( "<small class='error-msg'>Cpf/Cnpj já existe<br /></small>" ).insertAfter( $('#editform').find($('input[name ="cpf_ou_cnpj"]')));
 						}
					else{
						  location.reload();
					}
				}
			}); 
		}
	});

});




//Delete
$('.delItem').click(function() {
	delItem = $(this).attr('itemid')
	delentity = $(this).attr('entity')
	console.log(delItem)
})

$('#del').click(function() {

	var entity_singular = delentity.replace("es","").replace("s","")
	/*url: entity+'/'+delItem,*/
	console.log(entity_singular+'/'+delItem)
	$.ajax({
		url: "/"+entity_singular+'/'+delItem,
		type: 'DELETE', 
		success: function (arg) {
			location.reload()
		}
	});
});






});
