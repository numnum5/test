fetch("http://ec2-52-64-14-119.ap-southeast-2.compute.amazonaws.com:5280/api/units")
.then(res => res.json())
.then(res => console.log(res));