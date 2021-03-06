E2.p = E2.plugins["vr_sensor_available_generator"] = function(core, node)
{
	this.desc = 'Emits true if a VR position sensor is available and false otherwise.';
	
	this.input_slots = [];
	
	this.output_slots = [
		{ name: 'bool', dt: core.datatypes.BOOL, desc: 'True if a VR position sensor is available.' }
	];
	
	this.renderer = core.renderer;
};

E2.p.prototype.reset = function()
{
	this.updated = true;
};

E2.p.prototype.update_output = function(slot)
{
	return this.renderer.vr_sensor ? true : false;
};
