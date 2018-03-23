var AWS = require('aws-sdk');
AWS.config.update({
	accessKeyId : 'AKIAJFWEZ7BCQIRUAUCQ',
	secretAccessKey : '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'
});

AWS.config.update({
	region : 'us-east-2'
});
var ec2 = new AWS.EC2();

ec2.describeInstances(function(err, result) {
	if (err)
		console.log(err);
	var inst_id = '-';
	for (var i = 0; i < result.Reservations.length; i++) {
		var res = result.Reservations[i];
		var instances = res.Instances;
		for (var j = 0; j < instances.length; j++) {
			var instanceID = instances[j].InstanceId;
			var state = instances[j].State.Code;
			var public_ip = instances[j].PublicIpAddress;
			var imageID = instances[j].ImageId;
			console.log('instance ' + instanceID + " state " + state
					+ " public ip " + public_ip + 'image id ' + imageID);
		}
	}
});

ec2.runInstances({
	ImageId : 'ami-25615740',
	MaxCount : 1,
	MinCount : 1,
	BlockDeviceMappings : [ {
		DeviceName : '/dev/xvda',
		Ebs : {
			DeleteOnTermination : true,
			VolumeSize : 10
		}
	} ],
	InstanceType : 't2.micro',
	SecurityGroupIds : [ 'sg-06dfce0c794103eb5' ],
	Monitoring : {
		Enabled : false
	},
}, function(err, data) {
	dataInstance=data;
	if (err) {
		console.log("Could not create instance", err);
		return;
	} else {
		console.log('Instances Started :\nDetails ' ,dataInstance);
	}
	

});

var terminate = new Array();
terminate[terminate.length] = 'instanceID1';
terminate[terminate.length] = 'instanceID2';
ec2.terminateInstances({
	InstanceIds : terminate
}, function(err) {
	if (err)
		console.log("terminate" + err);
});