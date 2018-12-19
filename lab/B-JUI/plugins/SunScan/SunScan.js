function init()
{
	SunScan.CreateSunScan("Y002", "JKDS");
}

function settoolbar()
{
	var PARAMXML = "<?xml version='1.0' encoding='GB2312' ?>" +
									"<root>" +
										"<head>" +
											"<transcode>td0037</transcode>" +
										"</head>" +
										"<body>" +
											"<param>111111111111111111111111111</param>" +
											"<param>00000000101111111111111</param>" +
											"<param>11111</param>" +
										"</body>" +
									"</root>";

	SunScan.CommOcxFunction(PARAMXML);
}


function Add()
{
	var TRADEXML = "<?xml version='1.0' encoding='GB2312'?>" +
									"<root>" +
										"<business appid='Y002' tradecode='JKDS' optiontype='0' " +
										"tradedate='20151202' tradeuser='admin' " +
										"objname='APP1011' objpart='PART1011' user='HTJZZY' pwd='wyl' " +
										"objtoken='' isenc='0' organ='' " +
										"ip='192.168.53.4' port='8021' dsname=''>" + 
											"<node theme='0001'>" +
												"<bsinf attr='BUSI_SERIAL_NO' disp='批次号' isquery='1'>2015120210000</bsinf>" +  
												"<bsinf attr='BUSI_START_DATE' disp='业务开始日期' isquery='1'>20151202</bsinf>" +
											"</node>" +
											"</business>" +
										"</root>";
	var TREEXML = "<?xml version='1.0' encoding='GB2312'?>" +
								"<root>" +
									"<tree appid='Y002' tradecode='JKDS' theme='0001'>" +
										"<node name='BUSI_SERIAL_NO' desc='批次号' isimage='1' barcode='0' forms='0' attri='0' isauth='11111' issuc='0'>" + 
											"<node name='IDCARD' desc='身份证' isimage='2' barcode='' forms='' attri='1' isauth='11111' issuc='0'/>" +
											"<node name='BILL' desc='票据' isimage='2' barcode='' forms='' attri='1' isauth='11111' issuc='0'/>" +
										"</node>" +
									"</tree>" +
								"</root>";

	SunScan.ShowSunScan(TRADEXML, TREEXML);								
}

function Modify()
{
	var TRADEXML = "<?xml version='1.0' encoding='GB2312'?>" +
									"<root>" +
										"<business appid='Y002' tradecode='JKDS' optiontype='1' " +
										"tradedate='20130923' tradeuser='admin' " +
										"objname='XYZ' user='admin' pwd='111' " +
										"objtoken='' isenc='0' organ='' " +
										"ip='192.168.172.128' port='8023' dsname=''>" + 
											"<node theme='0001'>" +
												"<bsinf attr='BUSI_SERIAL_NO' disp='批次号' isquery='1'>10000</bsinf>" +  
												"<bsinf attr='BUSI_START_DATE' disp='业务开始日期' isquery='1'></bsinf>" +
											"</node>" +
											"</business>" +
										"</root>";
	var TREEXML = "<?xml version='1.0' encoding='GB2312'?>" +
								"<root>" +
									"<tree appid='Y002' tradecode='JKDS' theme='0001'>" +
										"<node name='BUSI_SERIAL_NO' desc='批次号' isimage='1' barcode='0' forms='0' attri='0' isauth='11111' issuc='0'>" + 
											"<node name='IDCARD' desc='身份证' isimage='2' barcode='' forms='' attri='1' isauth='11111' issuc='0'/>" +
											"<node name='BILL' desc='票据' isimage='2' barcode='' forms='' attri='1' isauth='11111' issuc='0'/>" +
										"</node>" +
									"</tree>" +
								"</root>";

	SunScan.ShowSunScan(TRADEXML, TREEXML);	}

function Query()
{
	var TRADEXML = "<?xml version='1.0' encoding='GB2312'?>" +
									"<root>" +
										"<business appid='Y002' tradecode='JKDS' optiontype='2' " +
										"tradedate='20130923' tradeuser='admin' " +
										"objname='XYZ' user='admin' pwd='111' " +
										"objtoken='' isenc='0' organ='' " +
										"ip='192.168.172.128' port='8023' dsname=''>" + 
											"<node theme='0001'>" +
												"<bsinf attr='BUSI_SERIAL_NO' disp='批次号' isquery='1'>10000</bsinf>" +  
												"<bsinf attr='BUSI_START_DATE' disp='业务开始日期' isquery='1'></bsinf>" +
											"</node>" +
											"</business>" +
										"</root>";
	var TREEXML = "<?xml version='1.0' encoding='GB2312'?>" +
								"<root>" +
									"<tree appid='Y002' tradecode='JKDS' theme='0001'>" +
										"<node name='BUSI_SERIAL_NO' desc='批次号' isimage='1' barcode='0' forms='0' attri='0' isauth='11111' issuc='0'>" + 
											"<node name='IDCARD' desc='身份证' isimage='2' barcode='' forms='' attri='1' isauth='11111' issuc='0'/>" +
											"<node name='BILL' desc='票据' isimage='2' barcode='' forms='' attri='1' isauth='11111' issuc='0'/>" +
										"</node>" +
									"</tree>" +
								"</root>";

	SunScan.ShowSunScan(TRADEXML, TREEXML);	
}  

function Submit()
{
		var TRADEXML = "<?xml version='1.0' encoding='GB2312'?>" +
									"<root>" +
										"<head>" +
											"<transcode>td0003</transcode>" + 
										"</head>" + 
										"<body>" + 
										"</body>" +
									"</root>"

	alert(SunScan.CommOcxFunction(TRADEXML));	
}

function SetParam()
{
	var TRADEXML = "<?xml version='1.0' encoding='GB2312'?>" +
									"<root>" +
										"<head>" +
											"<transcode>td0010</transcode>" + 
										"</head>" + 
										"<body>" + 
											"<param name='defaultmap'>IAS</param>" + 
										"</body>" +
									"</root>"

	alert(SunScan.CommOcxFunction(TRADEXML));		
}

function GetOCR()
{
	var TRADEXML = "<?xml version='1.0' encoding='GB2312'?>" +
									"<root>" +
										"<head>" +
											"<transcode>td0015</transcode>" + 
										"</head>" + 
										"<body>" + 
											"<param></param>" + 
										"</body>" +
									"</root>"

	alert(SunScan.CommOcxFunction(TRADEXML));		
}