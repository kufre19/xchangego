(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_components_wallets_MainWalletDetail_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/wallets/MainWalletDetail.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/wallets/MainWalletDetail.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_qrcode_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-qrcode-component */ "./node_modules/vue-qrcode-component/src/QRCode.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// component

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ["type", "symbol", "address"],
  // component list
  components: {
    "qr-code": vue_qrcode_component__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  // component data
  data: function data() {
    return {
      wal: {},
      wal_trx: {},
      addresses: {},
      gnl: gnl,
      loading: false,
      api: 1,
      pathname: "main",
      plat: plat,
      withdraw_memo: null,
      withdraw_amount: null,
      withdraw_address: null,
      network: null,
      token: null,
      networks: null
    };
  },
  // custom methods
  methods: {
    fetchData: function fetchData() {
      var _this = this;

      this.$http.post("/user/fetch/eco/wallet/main/" + this.symbol + "/" + this.address).then(function (response) {
        _this.wal = response.data.wal, _this.wal_trx = response.data.wal_trx, _this.token = response.data.token, _this.networks = response.data.networks, _this.addresses = response.data.addresses;

        _this.$emit("RefreshMainWallet", response.data.wal);
      });
    },
    fetchWalletTrx: function fetchWalletTrx() {
      var _this2 = this;

      this.$http.post("/user/fetch/eco/wallet/main/" + this.symbol + "/" + this.address).then(function (response) {
        _this2.wal_trx = response.data.wal_trx, _this2.$emit("RefreshMainWallet", response.data.wal);
      });
    },
    Withdraw: function Withdraw(chain) {
      var _this3 = this;

      this.loading = true, this.$http.post("/user/eco/wallet/withdraw", {
        symbol: this.symbol,
        withdraw_address: this.withdraw_address,
        memo: this.withdraw_memo,
        amount: this.withdraw_amount,
        chain: chain
      }).then(function (response) {
        _this3.$toast[response.data.type](response.data.message);
      })["catch"](function (error) {
        _this3.$toast.error(error.response.data);
      })["finally"](function () {
        _this3.fetchData();

        _this3.fetchWalletTrx();

        _this3.loading = false;
        $("#withdraw").modal("hide");
      });
    }
  },
  // on component created
  created: function created() {
    this.fetchData();
  },
  // on component mounted
  mounted: function mounted() {},
  // on component destroyed
  destroyed: function destroyed() {}
});

/***/ }),

/***/ "./node_modules/qrcode-js-package/qrcode.js":
/*!**************************************************!*\
  !*** ./node_modules/qrcode-js-package/qrcode.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/**
 * @fileoverview
 * - Using the 'QRCode for Javascript library'
 * - Fixed dataset of 'QRCode for Javascript library' for support full-spec.
 * - this library has no dependencies.
 * 
 * @author davidshimjs
 * @see <a href="http://www.d-project.com/" target="_blank">http://www.d-project.com/</a>
 * @see <a href="http://jeromeetienne.github.com/jquery-qrcode/" target="_blank">http://jeromeetienne.github.com/jquery-qrcode/</a>
 */
var QRCode;

(function () {
	//---------------------------------------------------------------------
	// QRCode for JavaScript
	//
	// Copyright (c) 2009 Kazuhiko Arase
	//
	// URL: http://www.d-project.com/
	//
	// Licensed under the MIT license:
	//   http://www.opensource.org/licenses/mit-license.php
	//
	// The word "QR Code" is registered trademark of 
	// DENSO WAVE INCORPORATED
	//   http://www.denso-wave.com/qrcode/faqpatent-e.html
	//
	//---------------------------------------------------------------------
	function QR8bitByte(data) {
		this.mode = QRMode.MODE_8BIT_BYTE;
		this.data = data;
		this.parsedData = [];

		// Added to support UTF-8 Characters
		for (var i = 0, l = this.data.length; i < l; i++) {
			var byteArray = [];
			var code = this.data.charCodeAt(i);

			if (code > 0x10000) {
				byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
				byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
				byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
				byteArray[3] = 0x80 | (code & 0x3F);
			} else if (code > 0x800) {
				byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
				byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
				byteArray[2] = 0x80 | (code & 0x3F);
			} else if (code > 0x80) {
				byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
				byteArray[1] = 0x80 | (code & 0x3F);
			} else {
				byteArray[0] = code;
			}

			this.parsedData.push(byteArray);
		}

		this.parsedData = Array.prototype.concat.apply([], this.parsedData);

		if (this.parsedData.length != this.data.length) {
			this.parsedData.unshift(191);
			this.parsedData.unshift(187);
			this.parsedData.unshift(239);
		}
	}

	QR8bitByte.prototype = {
		getLength: function (buffer) {
			return this.parsedData.length;
		},
		write: function (buffer) {
			for (var i = 0, l = this.parsedData.length; i < l; i++) {
				buffer.put(this.parsedData[i], 8);
			}
		}
	};

	function QRCodeModel(typeNumber, errorCorrectLevel) {
		this.typeNumber = typeNumber;
		this.errorCorrectLevel = errorCorrectLevel;
		this.modules = null;
		this.moduleCount = 0;
		this.dataCache = null;
		this.dataList = [];
	}

	QRCodeModel.prototype={addData:function(data){var newData=new QR8bitByte(data);this.dataList.push(newData);this.dataCache=null;},isDark:function(row,col){if(row<0||this.moduleCount<=row||col<0||this.moduleCount<=col){throw new Error(row+","+col);}
	return this.modules[row][col];},getModuleCount:function(){return this.moduleCount;},make:function(){this.makeImpl(false,this.getBestMaskPattern());},makeImpl:function(test,maskPattern){this.moduleCount=this.typeNumber*4+17;this.modules=new Array(this.moduleCount);for(var row=0;row<this.moduleCount;row++){this.modules[row]=new Array(this.moduleCount);for(var col=0;col<this.moduleCount;col++){this.modules[row][col]=null;}}
	this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(test,maskPattern);if(this.typeNumber>=7){this.setupTypeNumber(test);}
	if(this.dataCache==null){this.dataCache=QRCodeModel.createData(this.typeNumber,this.errorCorrectLevel,this.dataList);}
	this.mapData(this.dataCache,maskPattern);},setupPositionProbePattern:function(row,col){for(var r=-1;r<=7;r++){if(row+r<=-1||this.moduleCount<=row+r)continue;for(var c=-1;c<=7;c++){if(col+c<=-1||this.moduleCount<=col+c)continue;if((0<=r&&r<=6&&(c==0||c==6))||(0<=c&&c<=6&&(r==0||r==6))||(2<=r&&r<=4&&2<=c&&c<=4)){this.modules[row+r][col+c]=true;}else{this.modules[row+r][col+c]=false;}}}},getBestMaskPattern:function(){var minLostPoint=0;var pattern=0;for(var i=0;i<8;i++){this.makeImpl(true,i);var lostPoint=QRUtil.getLostPoint(this);if(i==0||minLostPoint>lostPoint){minLostPoint=lostPoint;pattern=i;}}
	return pattern;},createMovieClip:function(target_mc,instance_name,depth){var qr_mc=target_mc.createEmptyMovieClip(instance_name,depth);var cs=1;this.make();for(var row=0;row<this.modules.length;row++){var y=row*cs;for(var col=0;col<this.modules[row].length;col++){var x=col*cs;var dark=this.modules[row][col];if(dark){qr_mc.beginFill(0,100);qr_mc.moveTo(x,y);qr_mc.lineTo(x+cs,y);qr_mc.lineTo(x+cs,y+cs);qr_mc.lineTo(x,y+cs);qr_mc.endFill();}}}
	return qr_mc;},setupTimingPattern:function(){for(var r=8;r<this.moduleCount-8;r++){if(this.modules[r][6]!=null){continue;}
	this.modules[r][6]=(r%2==0);}
	for(var c=8;c<this.moduleCount-8;c++){if(this.modules[6][c]!=null){continue;}
	this.modules[6][c]=(c%2==0);}},setupPositionAdjustPattern:function(){var pos=QRUtil.getPatternPosition(this.typeNumber);for(var i=0;i<pos.length;i++){for(var j=0;j<pos.length;j++){var row=pos[i];var col=pos[j];if(this.modules[row][col]!=null){continue;}
	for(var r=-2;r<=2;r++){for(var c=-2;c<=2;c++){if(r==-2||r==2||c==-2||c==2||(r==0&&c==0)){this.modules[row+r][col+c]=true;}else{this.modules[row+r][col+c]=false;}}}}}},setupTypeNumber:function(test){var bits=QRUtil.getBCHTypeNumber(this.typeNumber);for(var i=0;i<18;i++){var mod=(!test&&((bits>>i)&1)==1);this.modules[Math.floor(i/3)][i%3+this.moduleCount-8-3]=mod;}
	for(var i=0;i<18;i++){var mod=(!test&&((bits>>i)&1)==1);this.modules[i%3+this.moduleCount-8-3][Math.floor(i/3)]=mod;}},setupTypeInfo:function(test,maskPattern){var data=(this.errorCorrectLevel<<3)|maskPattern;var bits=QRUtil.getBCHTypeInfo(data);for(var i=0;i<15;i++){var mod=(!test&&((bits>>i)&1)==1);if(i<6){this.modules[i][8]=mod;}else if(i<8){this.modules[i+1][8]=mod;}else{this.modules[this.moduleCount-15+i][8]=mod;}}
	for(var i=0;i<15;i++){var mod=(!test&&((bits>>i)&1)==1);if(i<8){this.modules[8][this.moduleCount-i-1]=mod;}else if(i<9){this.modules[8][15-i-1+1]=mod;}else{this.modules[8][15-i-1]=mod;}}
	this.modules[this.moduleCount-8][8]=(!test);},mapData:function(data,maskPattern){var inc=-1;var row=this.moduleCount-1;var bitIndex=7;var byteIndex=0;for(var col=this.moduleCount-1;col>0;col-=2){if(col==6)col--;while(true){for(var c=0;c<2;c++){if(this.modules[row][col-c]==null){var dark=false;if(byteIndex<data.length){dark=(((data[byteIndex]>>>bitIndex)&1)==1);}
	var mask=QRUtil.getMask(maskPattern,row,col-c);if(mask){dark=!dark;}
	this.modules[row][col-c]=dark;bitIndex--;if(bitIndex==-1){byteIndex++;bitIndex=7;}}}
	row+=inc;if(row<0||this.moduleCount<=row){row-=inc;inc=-inc;break;}}}}};QRCodeModel.PAD0=0xEC;QRCodeModel.PAD1=0x11;QRCodeModel.createData=function(typeNumber,errorCorrectLevel,dataList){var rsBlocks=QRRSBlock.getRSBlocks(typeNumber,errorCorrectLevel);var buffer=new QRBitBuffer();for(var i=0;i<dataList.length;i++){var data=dataList[i];buffer.put(data.mode,4);buffer.put(data.getLength(),QRUtil.getLengthInBits(data.mode,typeNumber));data.write(buffer);}
	var totalDataCount=0;for(var i=0;i<rsBlocks.length;i++){totalDataCount+=rsBlocks[i].dataCount;}
	if(buffer.getLengthInBits()>totalDataCount*8){throw new Error("code length overflow. ("
	+buffer.getLengthInBits()
	+">"
	+totalDataCount*8
	+")");}
	if(buffer.getLengthInBits()+4<=totalDataCount*8){buffer.put(0,4);}
	while(buffer.getLengthInBits()%8!=0){buffer.putBit(false);}
	while(true){if(buffer.getLengthInBits()>=totalDataCount*8){break;}
	buffer.put(QRCodeModel.PAD0,8);if(buffer.getLengthInBits()>=totalDataCount*8){break;}
	buffer.put(QRCodeModel.PAD1,8);}
	return QRCodeModel.createBytes(buffer,rsBlocks);};QRCodeModel.createBytes=function(buffer,rsBlocks){var offset=0;var maxDcCount=0;var maxEcCount=0;var dcdata=new Array(rsBlocks.length);var ecdata=new Array(rsBlocks.length);for(var r=0;r<rsBlocks.length;r++){var dcCount=rsBlocks[r].dataCount;var ecCount=rsBlocks[r].totalCount-dcCount;maxDcCount=Math.max(maxDcCount,dcCount);maxEcCount=Math.max(maxEcCount,ecCount);dcdata[r]=new Array(dcCount);for(var i=0;i<dcdata[r].length;i++){dcdata[r][i]=0xff&buffer.buffer[i+offset];}
	offset+=dcCount;var rsPoly=QRUtil.getErrorCorrectPolynomial(ecCount);var rawPoly=new QRPolynomial(dcdata[r],rsPoly.getLength()-1);var modPoly=rawPoly.mod(rsPoly);ecdata[r]=new Array(rsPoly.getLength()-1);for(var i=0;i<ecdata[r].length;i++){var modIndex=i+modPoly.getLength()-ecdata[r].length;ecdata[r][i]=(modIndex>=0)?modPoly.get(modIndex):0;}}
	var totalCodeCount=0;for(var i=0;i<rsBlocks.length;i++){totalCodeCount+=rsBlocks[i].totalCount;}
	var data=new Array(totalCodeCount);var index=0;for(var i=0;i<maxDcCount;i++){for(var r=0;r<rsBlocks.length;r++){if(i<dcdata[r].length){data[index++]=dcdata[r][i];}}}
	for(var i=0;i<maxEcCount;i++){for(var r=0;r<rsBlocks.length;r++){if(i<ecdata[r].length){data[index++]=ecdata[r][i];}}}
	return data;};var QRMode={MODE_NUMBER:1<<0,MODE_ALPHA_NUM:1<<1,MODE_8BIT_BYTE:1<<2,MODE_KANJI:1<<3};var QRErrorCorrectLevel={L:1,M:0,Q:3,H:2};var QRMaskPattern={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var QRUtil={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:(1<<10)|(1<<8)|(1<<5)|(1<<4)|(1<<2)|(1<<1)|(1<<0),G18:(1<<12)|(1<<11)|(1<<10)|(1<<9)|(1<<8)|(1<<5)|(1<<2)|(1<<0),G15_MASK:(1<<14)|(1<<12)|(1<<10)|(1<<4)|(1<<1),getBCHTypeInfo:function(data){var d=data<<10;while(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G15)>=0){d^=(QRUtil.G15<<(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G15)));}
	return((data<<10)|d)^QRUtil.G15_MASK;},getBCHTypeNumber:function(data){var d=data<<12;while(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G18)>=0){d^=(QRUtil.G18<<(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G18)));}
	return(data<<12)|d;},getBCHDigit:function(data){var digit=0;while(data!=0){digit++;data>>>=1;}
	return digit;},getPatternPosition:function(typeNumber){return QRUtil.PATTERN_POSITION_TABLE[typeNumber-1];},getMask:function(maskPattern,i,j){switch(maskPattern){case QRMaskPattern.PATTERN000:return(i+j)%2==0;case QRMaskPattern.PATTERN001:return i%2==0;case QRMaskPattern.PATTERN010:return j%3==0;case QRMaskPattern.PATTERN011:return(i+j)%3==0;case QRMaskPattern.PATTERN100:return(Math.floor(i/2)+Math.floor(j/3))%2==0;case QRMaskPattern.PATTERN101:return(i*j)%2+(i*j)%3==0;case QRMaskPattern.PATTERN110:return((i*j)%2+(i*j)%3)%2==0;case QRMaskPattern.PATTERN111:return((i*j)%3+(i+j)%2)%2==0;default:throw new Error("bad maskPattern:"+maskPattern);}},getErrorCorrectPolynomial:function(errorCorrectLength){var a=new QRPolynomial([1],0);for(var i=0;i<errorCorrectLength;i++){a=a.multiply(new QRPolynomial([1,QRMath.gexp(i)],0));}
	return a;},getLengthInBits:function(mode,type){if(1<=type&&type<10){switch(mode){case QRMode.MODE_NUMBER:return 10;case QRMode.MODE_ALPHA_NUM:return 9;case QRMode.MODE_8BIT_BYTE:return 8;case QRMode.MODE_KANJI:return 8;default:throw new Error("mode:"+mode);}}else if(type<27){switch(mode){case QRMode.MODE_NUMBER:return 12;case QRMode.MODE_ALPHA_NUM:return 11;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 10;default:throw new Error("mode:"+mode);}}else if(type<41){switch(mode){case QRMode.MODE_NUMBER:return 14;case QRMode.MODE_ALPHA_NUM:return 13;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 12;default:throw new Error("mode:"+mode);}}else{throw new Error("type:"+type);}},getLostPoint:function(qrCode){var moduleCount=qrCode.getModuleCount();var lostPoint=0;for(var row=0;row<moduleCount;row++){for(var col=0;col<moduleCount;col++){var sameCount=0;var dark=qrCode.isDark(row,col);for(var r=-1;r<=1;r++){if(row+r<0||moduleCount<=row+r){continue;}
	for(var c=-1;c<=1;c++){if(col+c<0||moduleCount<=col+c){continue;}
	if(r==0&&c==0){continue;}
	if(dark==qrCode.isDark(row+r,col+c)){sameCount++;}}}
	if(sameCount>5){lostPoint+=(3+sameCount-5);}}}
	for(var row=0;row<moduleCount-1;row++){for(var col=0;col<moduleCount-1;col++){var count=0;if(qrCode.isDark(row,col))count++;if(qrCode.isDark(row+1,col))count++;if(qrCode.isDark(row,col+1))count++;if(qrCode.isDark(row+1,col+1))count++;if(count==0||count==4){lostPoint+=3;}}}
	for(var row=0;row<moduleCount;row++){for(var col=0;col<moduleCount-6;col++){if(qrCode.isDark(row,col)&&!qrCode.isDark(row,col+1)&&qrCode.isDark(row,col+2)&&qrCode.isDark(row,col+3)&&qrCode.isDark(row,col+4)&&!qrCode.isDark(row,col+5)&&qrCode.isDark(row,col+6)){lostPoint+=40;}}}
	for(var col=0;col<moduleCount;col++){for(var row=0;row<moduleCount-6;row++){if(qrCode.isDark(row,col)&&!qrCode.isDark(row+1,col)&&qrCode.isDark(row+2,col)&&qrCode.isDark(row+3,col)&&qrCode.isDark(row+4,col)&&!qrCode.isDark(row+5,col)&&qrCode.isDark(row+6,col)){lostPoint+=40;}}}
	var darkCount=0;for(var col=0;col<moduleCount;col++){for(var row=0;row<moduleCount;row++){if(qrCode.isDark(row,col)){darkCount++;}}}
	var ratio=Math.abs(100*darkCount/moduleCount/moduleCount-50)/5;lostPoint+=ratio*10;return lostPoint;}};var QRMath={glog:function(n){if(n<1){throw new Error("glog("+n+")");}
	return QRMath.LOG_TABLE[n];},gexp:function(n){while(n<0){n+=255;}
	while(n>=256){n-=255;}
	return QRMath.EXP_TABLE[n];},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)};for(var i=0;i<8;i++){QRMath.EXP_TABLE[i]=1<<i;}
	for(var i=8;i<256;i++){QRMath.EXP_TABLE[i]=QRMath.EXP_TABLE[i-4]^QRMath.EXP_TABLE[i-5]^QRMath.EXP_TABLE[i-6]^QRMath.EXP_TABLE[i-8];}
	for(var i=0;i<255;i++){QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]]=i;}
	function QRPolynomial(num,shift){if(num.length==undefined){throw new Error(num.length+"/"+shift);}
	var offset=0;while(offset<num.length&&num[offset]==0){offset++;}
	this.num=new Array(num.length-offset+shift);for(var i=0;i<num.length-offset;i++){this.num[i]=num[i+offset];}}
	QRPolynomial.prototype={get:function(index){return this.num[index];},getLength:function(){return this.num.length;},multiply:function(e){var num=new Array(this.getLength()+e.getLength()-1);for(var i=0;i<this.getLength();i++){for(var j=0;j<e.getLength();j++){num[i+j]^=QRMath.gexp(QRMath.glog(this.get(i))+QRMath.glog(e.get(j)));}}
	return new QRPolynomial(num,0);},mod:function(e){if(this.getLength()-e.getLength()<0){return this;}
	var ratio=QRMath.glog(this.get(0))-QRMath.glog(e.get(0));var num=new Array(this.getLength());for(var i=0;i<this.getLength();i++){num[i]=this.get(i);}
	for(var i=0;i<e.getLength();i++){num[i]^=QRMath.gexp(QRMath.glog(e.get(i))+ratio);}
	return new QRPolynomial(num,0).mod(e);}};function QRRSBlock(totalCount,dataCount){this.totalCount=totalCount;this.dataCount=dataCount;}
	QRRSBlock.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];QRRSBlock.getRSBlocks=function(typeNumber,errorCorrectLevel){var rsBlock=QRRSBlock.getRsBlockTable(typeNumber,errorCorrectLevel);if(rsBlock==undefined){throw new Error("bad rs block @ typeNumber:"+typeNumber+"/errorCorrectLevel:"+errorCorrectLevel);}
	var length=rsBlock.length/3;var list=[];for(var i=0;i<length;i++){var count=rsBlock[i*3+0];var totalCount=rsBlock[i*3+1];var dataCount=rsBlock[i*3+2];for(var j=0;j<count;j++){list.push(new QRRSBlock(totalCount,dataCount));}}
	return list;};QRRSBlock.getRsBlockTable=function(typeNumber,errorCorrectLevel){switch(errorCorrectLevel){case QRErrorCorrectLevel.L:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+0];case QRErrorCorrectLevel.M:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+1];case QRErrorCorrectLevel.Q:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+2];case QRErrorCorrectLevel.H:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+3];default:return undefined;}};function QRBitBuffer(){this.buffer=[];this.length=0;}
	QRBitBuffer.prototype={get:function(index){var bufIndex=Math.floor(index/8);return((this.buffer[bufIndex]>>>(7-index%8))&1)==1;},put:function(num,length){for(var i=0;i<length;i++){this.putBit(((num>>>(length-i-1))&1)==1);}},getLengthInBits:function(){return this.length;},putBit:function(bit){var bufIndex=Math.floor(this.length/8);if(this.buffer.length<=bufIndex){this.buffer.push(0);}
	if(bit){this.buffer[bufIndex]|=(0x80>>>(this.length%8));}
	this.length++;}};var QRCodeLimitLength=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];
	
	function _isSupportCanvas() {
		return typeof CanvasRenderingContext2D != "undefined";
	}
	
	// android 2.x doesn't support Data-URI spec
	function _getAndroid() {
		var android = false;
		var sAgent = navigator.userAgent;
		
		if (/android/i.test(sAgent)) { // android
			android = true;
			var aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);
			
			if (aMat && aMat[1]) {
				android = parseFloat(aMat[1]);
			}
		}
		
		return android;
	}
	
	var svgDrawer = (function() {

		var Drawing = function (el, htOption) {
			this._el = el;
			this._htOption = htOption;
		};

		Drawing.prototype.draw = function (oQRCode) {
			var _htOption = this._htOption;
			var _el = this._el;
			var nCount = oQRCode.getModuleCount();
			var nWidth = Math.floor(_htOption.width / nCount);
			var nHeight = Math.floor(_htOption.height / nCount);

			this.clear();

			function makeSVG(tag, attrs) {
				var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
				for (var k in attrs)
					if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
				return el;
			}

			var svg = makeSVG("svg" , {'viewBox': '0 0 ' + String(nCount) + " " + String(nCount), 'width': '100%', 'height': '100%', 'fill': _htOption.colorLight});
			svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
			_el.appendChild(svg);

			svg.appendChild(makeSVG("rect", {"fill": _htOption.colorLight, "width": "100%", "height": "100%"}));
			svg.appendChild(makeSVG("rect", {"fill": _htOption.colorDark, "width": "1", "height": "1", "id": "template"}));

			for (var row = 0; row < nCount; row++) {
				for (var col = 0; col < nCount; col++) {
					if (oQRCode.isDark(row, col)) {
						var child = makeSVG("use", {"x": String(row), "y": String(col)});
						child.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template")
						svg.appendChild(child);
					}
				}
			}
		};
		Drawing.prototype.clear = function () {
			while (this._el.hasChildNodes())
				this._el.removeChild(this._el.lastChild);
		};
		return Drawing;
	})();

	var useSVG = document.documentElement.tagName.toLowerCase() === "svg";

	// Drawing in DOM by using Table tag
	var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ? (function () {
		var Drawing = function (el, htOption) {
			this._el = el;
			this._htOption = htOption;
		};
			
		/**
		 * Draw the QRCode
		 * 
		 * @param {QRCode} oQRCode
		 */
		Drawing.prototype.draw = function (oQRCode) {
            var _htOption = this._htOption;
            var _el = this._el;
			var nCount = oQRCode.getModuleCount();
			var nWidth = Math.floor(_htOption.width / nCount);
			var nHeight = Math.floor(_htOption.height / nCount);
			var aHTML = ['<table style="border:0;border-collapse:collapse;">'];
			
			for (var row = 0; row < nCount; row++) {
				aHTML.push('<tr>');
				
				for (var col = 0; col < nCount; col++) {
					aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (oQRCode.isDark(row, col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
				}
				
				aHTML.push('</tr>');
			}
			
			aHTML.push('</table>');
			_el.innerHTML = aHTML.join('');
			
			// Fix the margin values as real size.
			var elTable = _el.childNodes[0];
			var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
			var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;
			
			if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
				elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";	
			}
		};
		
		/**
		 * Clear the QRCode
		 */
		Drawing.prototype.clear = function () {
			this._el.innerHTML = '';
		};
		
		return Drawing;
	})() : (function () { // Drawing in Canvas
		function _onMakeImage() {
			this._elImage.src = this._elCanvas.toDataURL("image/png");
			this._elImage.style.setProperty("display", "block", "important");
			this._elCanvas.style.setProperty("display", "none", "important");
		}
		
		// Android 2.1 bug workaround
		// http://code.google.com/p/android/issues/detail?id=5141
		if (this._android && this._android <= 2.1) {
	    	var factor = 1 / window.devicePixelRatio;
	        var drawImage = CanvasRenderingContext2D.prototype.drawImage; 
	    	CanvasRenderingContext2D.prototype.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
	    		if (("nodeName" in image) && /img/i.test(image.nodeName)) {
		        	for (var i = arguments.length - 1; i >= 1; i--) {
		            	arguments[i] = arguments[i] * factor;
		        	}
	    		} else if (typeof dw == "undefined") {
	    			arguments[1] *= factor;
	    			arguments[2] *= factor;
	    			arguments[3] *= factor;
	    			arguments[4] *= factor;
	    		}
	    		
	        	drawImage.apply(this, arguments); 
	    	};
		}
		
		/**
		 * Check whether the user's browser supports Data URI or not
		 * 
		 * @private
		 * @param {Function} fSuccess Occurs if it supports Data URI
		 * @param {Function} fFail Occurs if it doesn't support Data URI
		 */
		function _safeSetDataURI(fSuccess, fFail) {
            var self = this;
            self._fFail = fFail;
            self._fSuccess = fSuccess;

            // Check it just once
            if (self._bSupportDataURI === null) {
                var el = document.createElement("img");
                var fOnError = function() {
                    self._bSupportDataURI = false;

                    if (self._fFail) {
                        self._fFail.call(self);
                    }
                };
                var fOnSuccess = function() {
                    self._bSupportDataURI = true;

                    if (self._fSuccess) {
                        self._fSuccess.call(self);
                    }
                };

                el.onabort = fOnError;
                el.onerror = fOnError;
                el.onload = fOnSuccess;
                el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; // the Image contains 1px data.
                return;
            } else if (self._bSupportDataURI === true && self._fSuccess) {
                self._fSuccess.call(self);
            } else if (self._bSupportDataURI === false && self._fFail) {
                self._fFail.call(self);
            }
		};
		
		/**
		 * Drawing QRCode by using canvas
		 * 
		 * @constructor
		 * @param {HTMLElement} el
		 * @param {Object} htOption QRCode Options 
		 */
		var Drawing = function (el, htOption) {
    		this._bIsPainted = false;
    		this._android = _getAndroid();
		
			this._htOption = htOption;
			this._elCanvas = document.createElement("canvas");
			this._elCanvas.width = htOption.width;
			this._elCanvas.height = htOption.height;
			el.appendChild(this._elCanvas);
			this._el = el;
			this._oContext = this._elCanvas.getContext("2d");
			this._bIsPainted = false;
			this._elImage = document.createElement("img");
			this._elImage.alt = "Scan me!";
			this._elImage.style.setProperty("display", "none", "important");
			this._el.appendChild(this._elImage);
			this._bSupportDataURI = null;
		};
			
		/**
		 * Draw the QRCode
		 * 
		 * @param {QRCode} oQRCode 
		 */
		Drawing.prototype.draw = function (oQRCode) {
            var _elImage = this._elImage;
            var _oContext = this._oContext;
            var _htOption = this._htOption;
            
			var nCount = oQRCode.getModuleCount();
			var nWidth = _htOption.width / nCount;
			var nHeight = _htOption.height / nCount;
			var nRoundedWidth = Math.round(nWidth);
			var nRoundedHeight = Math.round(nHeight);

			_elImage.style.setProperty("display", "none", "important");
			this.clear();
			
			for (var row = 0; row < nCount; row++) {
				for (var col = 0; col < nCount; col++) {
					var bIsDark = oQRCode.isDark(row, col);
					var nLeft = col * nWidth;
					var nTop = row * nHeight;
					_oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
					_oContext.lineWidth = 1;
					_oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;					
					_oContext.fillRect(nLeft, nTop, nWidth, nHeight);
					
					// 안티 앨리어싱 방지 처리
					_oContext.strokeRect(
						Math.floor(nLeft) + 0.5,
						Math.floor(nTop) + 0.5,
						nRoundedWidth,
						nRoundedHeight
					);
					
					_oContext.strokeRect(
						Math.ceil(nLeft) - 0.5,
						Math.ceil(nTop) - 0.5,
						nRoundedWidth,
						nRoundedHeight
					);
				}
			}
			
			this._bIsPainted = true;
		};
			
		/**
		 * Make the image from Canvas if the browser supports Data URI.
		 */
		Drawing.prototype.makeImage = function () {
			if (this._bIsPainted) {
				_safeSetDataURI.call(this, _onMakeImage);
			}
		};
			
		/**
		 * Return whether the QRCode is painted or not
		 * 
		 * @return {Boolean}
		 */
		Drawing.prototype.isPainted = function () {
			return this._bIsPainted;
		};
		
		/**
		 * Clear the QRCode
		 */
		Drawing.prototype.clear = function () {
			this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
			this._bIsPainted = false;
		};
		
		/**
		 * @private
		 * @param {Number} nNumber
		 */
		Drawing.prototype.round = function (nNumber) {
			if (!nNumber) {
				return nNumber;
			}
			
			return Math.floor(nNumber * 1000) / 1000;
		};
		
		return Drawing;
	})();
	
	/**
	 * Get the type by string length
	 * 
	 * @private
	 * @param {String} sText
	 * @param {Number} nCorrectLevel
	 * @return {Number} type
	 */
	function _getTypeNumber(sText, nCorrectLevel) {			
		var nType = 1;
		var length = _getUTF8Length(sText);
		
		for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
			var nLimit = 0;
			
			switch (nCorrectLevel) {
				case QRErrorCorrectLevel.L :
					nLimit = QRCodeLimitLength[i][0];
					break;
				case QRErrorCorrectLevel.M :
					nLimit = QRCodeLimitLength[i][1];
					break;
				case QRErrorCorrectLevel.Q :
					nLimit = QRCodeLimitLength[i][2];
					break;
				case QRErrorCorrectLevel.H :
					nLimit = QRCodeLimitLength[i][3];
					break;
			}
			
			if (length <= nLimit) {
				break;
			} else {
				nType++;
			}
		}
		
		if (nType > QRCodeLimitLength.length) {
			throw new Error("Too long data");
		}
		
		return nType;
	}

	function _getUTF8Length(sText) {
		var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
		return replacedText.length + (replacedText.length != sText ? 3 : 0);
	}
	
	/**
	 * @class QRCode
	 * @constructor
	 * @example 
	 * new QRCode(document.getElementById("test"), "http://jindo.dev.naver.com/collie");
	 *
	 * @example
	 * var oQRCode = new QRCode("test", {
	 *    text : "http://naver.com",
	 *    width : 128,
	 *    height : 128
	 * });
	 * 
	 * oQRCode.clear(); // Clear the QRCode.
	 * oQRCode.makeCode("http://map.naver.com"); // Re-create the QRCode.
	 *
	 * @param {HTMLElement|String} el target element or 'id' attribute of element.
	 * @param {Object|String} vOption
	 * @param {String} vOption.text QRCode link data
	 * @param {Number} [vOption.width=256]
	 * @param {Number} [vOption.height=256]
	 * @param {String} [vOption.colorDark="#000000"]
	 * @param {String} [vOption.colorLight="#ffffff"]
	 * @param {QRCode.CorrectLevel} [vOption.correctLevel=QRCode.CorrectLevel.H] [L|M|Q|H] 
	 */
	QRCode = function (el, vOption) {
		this._htOption = {
			width : 256, 
			height : 256,
			typeNumber : 4,
			colorDark : "#000000",
			colorLight : "#ffffff",
			correctLevel : QRErrorCorrectLevel.H
		};
		
		if (typeof vOption === 'string') {
			vOption	= {
				text : vOption
			};
		}
		
		// Overwrites options
		if (vOption) {
			for (var i in vOption) {
				this._htOption[i] = vOption[i];
			}
		}
		
		if (typeof el == "string") {
			el = document.getElementById(el);
		}

		if (this._htOption.useSVG) {
			Drawing = svgDrawer;
		}
		
		this._android = _getAndroid();
		this._el = el;
		this._oQRCode = null;
		this._oDrawing = new Drawing(this._el, this._htOption);
		
		if (this._htOption.text) {
			this.makeCode(this._htOption.text);	
		}
	};
	
	/**
	 * Make the QRCode
	 * 
	 * @param {String} sText link data
	 */
	QRCode.prototype.makeCode = function (sText) {
		this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
		this._oQRCode.addData(sText);
		this._oQRCode.make();
		this._el.title = sText;
		this._oDrawing.draw(this._oQRCode);			
		this.makeImage();
	};
	
	/**
	 * Make the Image from Canvas element
	 * - It occurs automatically
	 * - Android below 3 doesn't support Data-URI spec.
	 * 
	 * @private
	 */
	QRCode.prototype.makeImage = function () {
		if (typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3)) {
			this._oDrawing.makeImage();
		}
	};
	
	/**
	 * Clear the QRCode
	 */
	QRCode.prototype.clear = function () {
		this._oDrawing.clear();
	};
	
	/**
	 * @name QRCode.CorrectLevel
	 */
	QRCode.CorrectLevel = QRErrorCorrectLevel;
})();

if (module && module.exports) {
  module.exports = QRCode;
}


/***/ }),

/***/ "./node_modules/vue-qrcode-component/src/QRCode.vue":
/*!**********************************************************!*\
  !*** ./node_modules/vue-qrcode-component/src/QRCode.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _QRCode_vue_vue_type_template_id_499cd36c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QRCode.vue?vue&type=template&id=499cd36c& */ "./node_modules/vue-qrcode-component/src/QRCode.vue?vue&type=template&id=499cd36c&");
/* harmony import */ var _QRCode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QRCode.vue?vue&type=script&lang=js& */ "./node_modules/vue-qrcode-component/src/QRCode.vue?vue&type=script&lang=js&");
/* harmony import */ var _vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _QRCode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _QRCode_vue_vue_type_template_id_499cd36c___WEBPACK_IMPORTED_MODULE_0__.render,
  _QRCode_vue_vue_type_template_id_499cd36c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "node_modules/vue-qrcode-component/src/QRCode.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-qrcode-component/src/QRCode.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-qrcode-component/src/QRCode.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var qrcode_js_package_qrcode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! qrcode-js-package/qrcode.js */ "./node_modules/qrcode-js-package/qrcode.js");
/* harmony import */ var qrcode_js_package_qrcode_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(qrcode_js_package_qrcode_js__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({

    props: {
        text: {type: String, required: true},
        size: {type: Number, required: false, default: 256},
        color: {type: String, required: false, default: '#000'},
        bgColor: {type: String, required: false, default: '#FFF'},
        errorLevel: {
            type: String, 
            validator: function (value) {
                return value === 'L' || value === 'M' || value === 'Q' || value === 'H'
            }, 
            required: false, 
            default: 'H'
        }
    },

    watch: {
        text: function () {
            this.clear();
            this.makeCode(this.text);
        }
    },

    data() {
        return{
            qrCode: {}
        }
    },

    mounted() {
        this.qrCode = new (qrcode_js_package_qrcode_js__WEBPACK_IMPORTED_MODULE_0___default())(this.$el, {
            text: this.text,
            width: this.size,
            height: this.size,
            colorDark : this.color,
            colorLight : this.bgColor,
            correctLevel : (qrcode_js_package_qrcode_js__WEBPACK_IMPORTED_MODULE_0___default().CorrectLevel)[this.errorLevel]
        });
    },

    methods: {
        clear: function () {
            this.qrCode.clear();
        },
        makeCode: function (text) {
            this.qrCode.makeCode(text);
        }
    }
});


/***/ }),

/***/ "./resources/src/components/wallets/MainWalletDetail.vue":
/*!***************************************************************!*\
  !*** ./resources/src/components/wallets/MainWalletDetail.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MainWalletDetail_vue_vue_type_template_id_29f8069e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MainWalletDetail.vue?vue&type=template&id=29f8069e& */ "./resources/src/components/wallets/MainWalletDetail.vue?vue&type=template&id=29f8069e&");
/* harmony import */ var _MainWalletDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainWalletDetail.vue?vue&type=script&lang=js& */ "./resources/src/components/wallets/MainWalletDetail.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MainWalletDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MainWalletDetail_vue_vue_type_template_id_29f8069e___WEBPACK_IMPORTED_MODULE_0__.render,
  _MainWalletDetail_vue_vue_type_template_id_29f8069e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/components/wallets/MainWalletDetail.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/components/wallets/MainWalletDetail.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/src/components/wallets/MainWalletDetail.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainWalletDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MainWalletDetail.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/wallets/MainWalletDetail.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainWalletDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./node_modules/vue-qrcode-component/src/QRCode.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./node_modules/vue-qrcode-component/src/QRCode.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vue_loader_lib_index_js_vue_loader_options_QRCode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../vue-loader/lib/index.js??vue-loader-options!./QRCode.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-qrcode-component/src/QRCode.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_vue_loader_lib_index_js_vue_loader_options_QRCode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./node_modules/vue-qrcode-component/src/QRCode.vue?vue&type=template&id=499cd36c&":
/*!*****************************************************************************************!*\
  !*** ./node_modules/vue-qrcode-component/src/QRCode.vue?vue&type=template&id=499cd36c& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_QRCode_vue_vue_type_template_id_499cd36c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_QRCode_vue_vue_type_template_id_499cd36c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _vue_loader_lib_loaders_templateLoader_js_vue_loader_options_vue_loader_lib_index_js_vue_loader_options_QRCode_vue_vue_type_template_id_499cd36c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../vue-loader/lib/index.js??vue-loader-options!./QRCode.vue?vue&type=template&id=499cd36c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-qrcode-component/src/QRCode.vue?vue&type=template&id=499cd36c&");


/***/ }),

/***/ "./resources/src/components/wallets/MainWalletDetail.vue?vue&type=template&id=29f8069e&":
/*!**********************************************************************************************!*\
  !*** ./resources/src/components/wallets/MainWalletDetail.vue?vue&type=template&id=29f8069e& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MainWalletDetail_vue_vue_type_template_id_29f8069e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MainWalletDetail_vue_vue_type_template_id_29f8069e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MainWalletDetail_vue_vue_type_template_id_29f8069e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MainWalletDetail.vue?vue&type=template&id=29f8069e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/wallets/MainWalletDetail.vue?vue&type=template&id=29f8069e&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-qrcode-component/src/QRCode.vue?vue&type=template&id=499cd36c&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./node_modules/vue-qrcode-component/src/QRCode.vue?vue&type=template&id=499cd36c& ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/wallets/MainWalletDetail.vue?vue&type=template&id=29f8069e&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/wallets/MainWalletDetail.vue?vue&type=template&id=29f8069e& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "card mb-1" }, [
      _c("div", { staticClass: "card-body" }, [
        _c(
          "div",
          {
            staticClass: "d-flex align-items-center",
            class:
              _vm.plat.trading.practice != null &&
              _vm.plat.trading.practice != 1
                ? " justify-content-between"
                : " justify-content-start",
          },
          [
            _vm.wal.symbol != null
              ? _c("img", {
                  staticClass: "avatar-content me-1 d-none d-sm-block",
                  attrs: {
                    src: _vm.wal.symbol
                      ? "/assets/images/cryptoCurrency/" +
                        _vm.wal.symbol.toLowerCase() +
                        ".png"
                      : "/market/notification.png",
                  },
                })
              : _c("vue-skeleton-loader", {
                  attrs: {
                    type: "circle",
                    width: 64,
                    height: 64,
                    animation: "fade",
                  },
                }),
            _vm._v(" "),
            _vm.wal.symbol != null
              ? _c("span", { staticClass: "fw-bold fs-4 d-none d-lg-block" }, [
                  _vm._v(_vm._s(_vm.wal.symbol) + "\n                    "),
                  _vm.api == 1
                    ? _c("span", [_vm._v(_vm._s(_vm.type.toUpperCase()) + " ")])
                    : _vm._e(),
                  _vm._v(_vm._s(_vm.$t("Wallet"))),
                ])
              : _c("vue-skeleton-loader", {
                  staticClass: "d-none d-lg-block",
                  attrs: {
                    type: "rect",
                    width: 100,
                    height: 10,
                    animation: "fade",
                  },
                }),
            _vm._v(" "),
            _vm.plat.trading.practice != null && _vm.plat.trading.practice != 1
              ? _c("div", { staticClass: "d-flex justify-content-start" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-success me-1",
                      attrs: {
                        type: "button",
                        "data-bs-toggle": "modal",
                        "data-bs-target": "#deposit",
                      },
                    },
                    [
                      _c("i", { staticClass: "bi bi-wallet2" }),
                      _vm._v(
                        " " +
                          _vm._s(_vm.$t("Deposit")) +
                          "\n                    "
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-warning",
                      attrs: {
                        type: "button",
                        "data-bs-toggle": "modal",
                        "data-bs-target": "#withdraw",
                      },
                    },
                    [
                      _c("i", { staticClass: "bi bi-journal-arrow-down" }),
                      _vm._v(
                        "\n                        " +
                          _vm._s(_vm.$t("Withdraw")) +
                          "\n                    "
                      ),
                    ]
                  ),
                ])
              : _vm._e(),
          ],
          1
        ),
      ]),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "card" }, [
      _c(
        "div",
        {
          staticClass: "card mb-0",
          staticStyle: { overflow: "auto" },
          attrs: { id: "table-hover-row" },
        },
        [
          _c("div", { staticClass: "card-header" }, [
            _c("h4", { staticClass: "card-title" }, [
              _vm._v(_vm._s(_vm.$t("Wallet Transactions"))),
            ]),
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "table-responsive",
              staticStyle: {
                "min-height": "57vh",
                "max-height": "57vh",
                "overflow-y": "auto",
              },
            },
            [
              _c("table", { staticClass: "table tableFixHead" }, [
                _c("thead", [
                  _c("tr", [
                    _c("th", [_vm._v(_vm._s(_vm.$t("Type")))]),
                    _vm._v(" "),
                    _c("th", [_vm._v(_vm._s(_vm.$t("Info")))]),
                    _vm._v(" "),
                    _c("th", [_vm._v(_vm._s(_vm.$t("Transaction")))]),
                    _vm._v(" "),
                    _c("th", [_vm._v(_vm._s(_vm.$t("Status")))]),
                  ]),
                ]),
                _vm._v(" "),
                _vm.wal_trx != null && _vm.wal_trx.length > 0
                  ? _c(
                      "tbody",
                      { key: _vm.wal_trx.length },
                      _vm._l(_vm.wal_trx, function (trx, index) {
                        return _c("tr", { key: index }, [
                          _c("td", [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "avatar bg-light-primary rounded float-start",
                                staticStyle: { "max-height": "30px" },
                              },
                              [
                                _c("div", { staticClass: "avatar-content" }, [
                                  trx.operationType == "DEPOSIT" ||
                                  trx.operationType == "PAYMENT"
                                    ? _c("i", {
                                        staticClass:
                                          "text-success fs-3 bi bi-wallet2",
                                      })
                                    : trx.operationType == "WITHDRAWAL"
                                    ? _c(
                                        "span",
                                        { staticClass: "text-danger fs-3" },
                                        [_c("i", { staticClass: "bi bi-cash" })]
                                      )
                                    : _vm._e(),
                                ]),
                              ]
                            ),
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _c("div", [
                              _c("span", { staticClass: "text-warning" }, [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(_vm.$t("Amount")) +
                                    ":\n                                    "
                                ),
                              ]),
                              _vm._v(" "),
                              trx.amount != 0
                                ? _c("span", [
                                    _vm._v(
                                      "\n                                        " +
                                        _vm._s(
                                          _vm._f("toMoney")(trx.amount, 4)
                                        ) +
                                        "\n                                        " +
                                        _vm._s(_vm.wal.symbol) +
                                        "\n                                    "
                                    ),
                                  ])
                                : _vm._e(),
                            ]),
                            _vm._v(" "),
                            _c("div", [
                              _c("span", { staticClass: "text-warning" }, [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(_vm.$t("Value")) +
                                    " (USD):\n                                    "
                                ),
                              ]),
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(
                                    _vm._f("toMoney")(trx.marketValue.amount, 4)
                                  ) +
                                  "\n                                "
                              ),
                            ]),
                            _vm._v(" "),
                            _c("div", [
                              _c("span", { staticClass: "text-warning" }, [
                                _vm._v(
                                  _vm._s(_vm.$t("Reference ID")) +
                                    ":\n                                    "
                                ),
                              ]),
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(trx.reference) +
                                  "\n                                "
                              ),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            trx.operationType == "DEPOSIT" ||
                            trx.operationType == "PAYMENT"
                              ? _c("div", { staticClass: "avatar-group" }, [
                                  _vm._m(0, true),
                                  _vm._v(" "),
                                  _vm._m(1, true),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass: "avatar pull-up my-0",
                                      attrs: {
                                        "data-bs-toggle": "tooltip",
                                        "data-popup": "tooltip-custom",
                                        "data-bs-placement": "top",
                                        title: trx.symbol,
                                      },
                                    },
                                    [
                                      _c("img", {
                                        staticClass: "avatar-content",
                                        attrs: {
                                          src: trx.symbol
                                            ? "/assets/images/cryptoCurrency/" +
                                              trx.symbol.toLowerCase() +
                                              ".png"
                                            : "/market/notification.png",
                                          alt: "Avatar",
                                        },
                                      }),
                                    ]
                                  ),
                                ])
                              : trx.operationType == "WITHDRAWAL"
                              ? _c("div", { staticClass: "avatar-group" }, [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "avatar pull-up my-0",
                                      attrs: {
                                        "data-bs-toggle": "tooltip",
                                        "data-popup": "tooltip-custom",
                                        "data-bs-placement": "top",
                                        title: trx.address,
                                      },
                                    },
                                    [
                                      _c("img", {
                                        staticClass: "avatar-content",
                                        attrs: {
                                          src: _vm.wal.symbol
                                            ? "/assets/images/cryptoCurrency/" +
                                              _vm.wal.symbol.toLowerCase() +
                                              ".png"
                                            : "/market/notification.png",
                                          alt: "Avatar",
                                        },
                                      }),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _vm._m(2, true),
                                  _vm._v(" "),
                                  _vm._m(3, true),
                                ])
                              : _vm._e(),
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(
                              "\n                                " +
                                _vm._s(_vm._f("toDate")(trx.created)) +
                                "\n                            "
                            ),
                          ]),
                        ])
                      }),
                      0
                    )
                  : _c("tbody", [
                      _c("tr", [
                        _c(
                          "td",
                          {
                            staticClass: "text-muted text-center",
                            attrs: { colspan: "100%" },
                          },
                          [
                            _c("img", {
                              attrs: {
                                height: "128px",
                                width: "128px",
                                src: "https://assets.staticimg.com/pro/2.0.4/images/empty.svg",
                                alt: "",
                              },
                            }),
                            _vm._v(" "),
                            _c("p", {}, [
                              _vm._v(_vm._s(_vm.$t("No Data Found"))),
                            ]),
                          ]
                        ),
                      ]),
                    ]),
              ]),
            ]
          ),
        ]
      ),
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "deposit",
          tabindex: "-1",
          "aria-labelledby": "deposit",
          "aria-hidden": "true",
        },
      },
      [
        _c(
          "div",
          { staticClass: "modal-dialog modal-dialog-centered modal-lg" },
          [
            _vm.addresses != null
              ? _c("div", { staticClass: "modal-content" }, [
                  _c("div", { staticClass: "modal-header bg-transparent" }, [
                    _c("h5", { staticClass: "modal-title" }, [
                      _vm._v(
                        "\n                        " +
                          _vm._s(_vm.$t("Select Deposit Network")) +
                          "\n                    "
                      ),
                    ]),
                    _vm._v(" "),
                    _c("button", {
                      staticClass: "btn-close",
                      attrs: {
                        type: "button",
                        "data-bs-dismiss": "modal",
                        "aria-label": "Close",
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c(
                    "ul",
                    { staticClass: "nav nav-tabs", attrs: { role: "tablist" } },
                    [
                      _vm._l(_vm.addresses, function (wallet, key, index) {
                        return [
                          _vm.networks.indexOf(key) !== -1
                            ? _c(
                                "li",
                                { key: index, staticClass: "nav-item" },
                                [
                                  _c(
                                    "a",
                                    {
                                      staticClass: "nav-link",
                                      class: index == 0 ? "active" : "",
                                      attrs: {
                                        id: key + "-tab",
                                        "data-bs-toggle": "tab",
                                        "data-bs-target": "#" + key,
                                        role: "tab",
                                        "aria-selected": "false",
                                        "aria-controls": key,
                                      },
                                    },
                                    [_vm._v(_vm._s(key))]
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ]
                      }),
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "tab-content" },
                    [
                      _vm._l(_vm.addresses, function (wallet, key, index) {
                        return [
                          _vm.networks.indexOf(key) !== -1
                            ? _c(
                                "div",
                                {
                                  key: index,
                                  staticClass: "tab-pane",
                                  class: index == 0 ? "active" : "",
                                  attrs: { id: key, role: "tabpanel" },
                                },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "modal-body pb-3 px-sm-3" },
                                    [
                                      _c("div", { staticClass: "row" }, [
                                        _c(
                                          "div",
                                          { staticClass: "col-lg-3 col-md-5" },
                                          [
                                            _c("div", [
                                              _c(
                                                "label",
                                                {
                                                  staticClass:
                                                    "form-control-label h6",
                                                },
                                                [_vm._v(_vm._s(_vm.$t("To")))]
                                              ),
                                            ]),
                                            _vm._v(" "),
                                            _c("qr-code", {
                                              attrs: {
                                                size: 150,
                                                text: wallet.address
                                                  ? wallet.address
                                                  : "",
                                              },
                                            }),
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "col-lg-9 col-md-7" },
                                          [
                                            _c("div", [
                                              _c(
                                                "label",
                                                {
                                                  staticClass:
                                                    "form-control-label h6",
                                                  attrs: {
                                                    for: "recieving_address",
                                                  },
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.$t("Wallet Address")
                                                    )
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c("input", {
                                                ref: "\n                                                        recieving_address\n                                                    ",
                                                refInFor: true,
                                                staticClass: "form-control",
                                                attrs: {
                                                  type: "text",
                                                  readonly: "",
                                                },
                                                domProps: {
                                                  value: wallet.address
                                                    ? wallet.address
                                                    : "",
                                                },
                                              }),
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "d-flex justify-content-between mt-1",
                                              },
                                              [
                                                _c("span", [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.$t("Transfer Limit")
                                                    )
                                                  ),
                                                ]),
                                                _vm._v(" "),
                                                _c("span", [
                                                  _vm._v(
                                                    _vm._s(_vm.$t("Unlimited"))
                                                  ),
                                                ]),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c("hr"),
                                            _vm._v(" "),
                                            _vm.token != null &&
                                            _vm.token.has_memo == 1
                                              ? [
                                                  wallet.memo != "" ||
                                                  wallet.memo != null
                                                    ? _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "d-flex justify-content-between",
                                                        },
                                                        [
                                                          _c("span", [
                                                            _vm._v(
                                                              _vm._s(
                                                                _vm.$t("Memo")
                                                              )
                                                            ),
                                                          ]),
                                                          _vm._v(" "),
                                                          _c(
                                                            "span",
                                                            {
                                                              staticClass:
                                                                "text-warning",
                                                            },
                                                            [
                                                              _vm._v(
                                                                _vm._s(
                                                                  wallet.memo
                                                                    ? wallet.memo
                                                                    : ""
                                                                )
                                                              ),
                                                            ]
                                                          ),
                                                        ]
                                                      )
                                                    : _vm._e(),
                                                  _vm._v(" "),
                                                  _c("hr"),
                                                ]
                                              : _vm._e(),
                                          ],
                                          2
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "mt-1" }, [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(_vm.$t("This is a")) +
                                            "\n                                    "
                                        ),
                                        _c(
                                          "span",
                                          {
                                            ref: key,
                                            refInFor: true,
                                            staticClass: "text-info",
                                          },
                                          [_vm._v(_vm._s(key ? key : ""))]
                                        ),
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(
                                              _vm.$t(
                                                "Chain address. Do not send any other Chain to this address or your funds may be lost."
                                              )
                                            ) +
                                            ".\n                                "
                                        ),
                                      ]),
                                    ]
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ]
                      }),
                    ],
                    2
                  ),
                ])
              : _vm._e(),
          ]
        ),
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "withdraw",
          tabindex: "-1",
          "aria-labelledby": "withdraw",
          "aria-hidden": "true",
        },
      },
      [
        _c(
          "div",
          { staticClass: "modal-dialog modal-dialog-centered modal-lg" },
          [
            _c("div", { staticClass: "modal-content" }, [
              _c("div", { staticClass: "modal-header bg-transparent" }, [
                _c("h5", { staticClass: "modal-title" }, [
                  _vm._v(
                    "\n                        " +
                      _vm._s(_vm.$t("Select Withdraw Network")) +
                      "\n                    "
                  ),
                ]),
                _vm._v(" "),
                _c("button", {
                  staticClass: "btn-close",
                  attrs: {
                    type: "button",
                    "data-bs-dismiss": "modal",
                    "aria-label": "Close",
                  },
                }),
              ]),
              _vm._v(" "),
              _c(
                "ul",
                { staticClass: "nav nav-tabs", attrs: { role: "tablist" } },
                [
                  _vm._l(_vm.addresses, function (wallet, key, index) {
                    return [
                      _vm.networks.indexOf(key) !== -1
                        ? _c("li", { key: index, staticClass: "nav-item" }, [
                            _c(
                              "a",
                              {
                                staticClass: "nav-link",
                                class: index == 0 ? "active" : "",
                                attrs: {
                                  id: key + "-withdraw-tab",
                                  "data-bs-toggle": "tab",
                                  "data-bs-target": "#" + key + "-withdraw",
                                  role: "tab",
                                  "aria-selected": "false",
                                  "aria-controls": key,
                                },
                              },
                              [_vm._v(_vm._s(key))]
                            ),
                          ])
                        : _vm._e(),
                    ]
                  }),
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "tab-content" },
                [
                  _vm._l(_vm.addresses, function (wallet, key, index) {
                    return [
                      _vm.networks.indexOf(key) !== -1
                        ? _c(
                            "div",
                            {
                              key: index,
                              staticClass: "tab-pane",
                              class: index == 0 ? "active" : "",
                              attrs: {
                                id: key + "-withdraw",
                                role: "tabpanel",
                              },
                            },
                            [
                              _c(
                                "form",
                                {
                                  staticClass:
                                    "add-new-record modal-content pt-0",
                                  on: {
                                    submit: function ($event) {
                                      $event.preventDefault()
                                      return _vm.Withdraw(key)
                                    },
                                  },
                                },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "modal-body pb-3 px-sm-3" },
                                    [
                                      _c("div", { staticClass: "mb-1" }, [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "form-control-label h6",
                                            attrs: { for: "wallet_balance" },
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(_vm.$t("Wallet Balance"))
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c("input", {
                                          staticClass: "form-control",
                                          attrs: { type: "text", readonly: "" },
                                          domProps: {
                                            value:
                                              wallet.balance + " " + _vm.symbol,
                                          },
                                        }),
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "input-group" },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass: "input-group-text",
                                              attrs: {
                                                for: "withdraw_address",
                                              },
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(_vm.$t("Wallet Address"))
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("input", {
                                            directives: [
                                              {
                                                name: "model",
                                                rawName: "v-model",
                                                value: _vm.withdraw_address,
                                                expression: "withdraw_address",
                                              },
                                            ],
                                            staticClass: "form-control",
                                            attrs: { type: "text" },
                                            domProps: {
                                              value: _vm.withdraw_address,
                                            },
                                            on: {
                                              input: function ($event) {
                                                if ($event.target.composing) {
                                                  return
                                                }
                                                _vm.withdraw_address =
                                                  $event.target.value
                                              },
                                            },
                                          }),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "my-1" }, [
                                        _c(
                                          "div",
                                          { staticClass: "input-group" },
                                          [
                                            _c(
                                              "span",
                                              {
                                                staticClass: "input-group-text",
                                                attrs: { for: "amount" },
                                              },
                                              [_vm._v(_vm._s(_vm.$t("Amount")))]
                                            ),
                                            _vm._v(" "),
                                            _c("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value: _vm.withdraw_amount,
                                                  expression: "withdraw_amount",
                                                },
                                              ],
                                              staticClass: "form-control",
                                              attrs: {
                                                type: "number",
                                                min: _vm.token.withdraw_min,
                                                step: _vm.token.withdraw_min,
                                                max: _vm.token.withdraw_max,
                                              },
                                              domProps: {
                                                value: _vm.withdraw_amount,
                                              },
                                              on: {
                                                input: function ($event) {
                                                  if ($event.target.composing) {
                                                    return
                                                  }
                                                  _vm.withdraw_amount =
                                                    $event.target.value
                                                },
                                              },
                                            }),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c("small", [
                                          _vm._v(
                                            _vm._s(_vm.$t("Min")) +
                                              ":\n                                            "
                                          ),
                                          _c(
                                            "span",
                                            { staticClass: "text-warning" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm._f("toMoney")(
                                                    _vm.token.withdraw_min,
                                                    2
                                                  )
                                                )
                                              ),
                                            ]
                                          ),
                                          _vm._v(
                                            "\n                                            / " +
                                              _vm._s(_vm.$t("Max")) +
                                              ":\n                                            "
                                          ),
                                          _c(
                                            "span",
                                            { staticClass: "text-warning" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm._f("toMoney")(
                                                    _vm.token.withdraw_max,
                                                    2
                                                  )
                                                )
                                              ),
                                            ]
                                          ),
                                        ]),
                                      ]),
                                      _vm._v(" "),
                                      _vm.token != null &&
                                      _vm.token.has_memo == 1
                                        ? _c("div", { staticClass: "my-1" }, [
                                            _c(
                                              "div",
                                              { staticClass: "input-group" },
                                              [
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "input-group-text",
                                                    attrs: { for: "memo" },
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(_vm.$t("Memo"))
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c("input", {
                                                  directives: [
                                                    {
                                                      name: "model",
                                                      rawName: "v-model",
                                                      value: _vm.withdraw_memo,
                                                      expression:
                                                        "withdraw_memo",
                                                    },
                                                  ],
                                                  staticClass: "form-control",
                                                  attrs: { type: "text" },
                                                  domProps: {
                                                    value: _vm.withdraw_memo,
                                                  },
                                                  on: {
                                                    input: function ($event) {
                                                      if (
                                                        $event.target.composing
                                                      ) {
                                                        return
                                                      }
                                                      _vm.withdraw_memo =
                                                        $event.target.value
                                                    },
                                                  },
                                                }),
                                              ]
                                            ),
                                            _vm._v(
                                              "\n                                        >\n                                    "
                                            ),
                                          ])
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "input-group mt-1" },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass: "input-group-text",
                                              attrs: { for: "fees" },
                                            },
                                            [_vm._v(_vm._s(_vm.$t("Fees")))]
                                          ),
                                          _vm._v(" "),
                                          _c("input", {
                                            staticClass: "form-control",
                                            attrs: {
                                              type: "text",
                                              disabled: "",
                                            },
                                            domProps: {
                                              value:
                                                _vm.token.withdraw_fee +
                                                " " +
                                                _vm.token.symbol,
                                            },
                                          }),
                                        ]
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "modal-footer text-end" },
                                    [
                                      _c(
                                        "button",
                                        {
                                          staticClass: "btn btn-success",
                                          attrs: {
                                            type: "submit",
                                            disabled: _vm.loading,
                                          },
                                        },
                                        [
                                          _vm._v(
                                            "\n                                        " +
                                              _vm._s(_vm.$t("Withdraw")) +
                                              "\n                                    "
                                          ),
                                        ]
                                      ),
                                    ]
                                  ),
                                ]
                              ),
                            ]
                          )
                        : _vm._e(),
                    ]
                  }),
                ],
                2
              ),
            ]),
          ]
        ),
      ]
    ),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "text-success fs-3" }, [
      _c("i", { staticClass: "bi bi-wallet2" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "my-0 mx-2 text-success fs-3 ms-q" }, [
      _c("i", { staticClass: "bi bi-arrow-right" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "my-0 mx-2 text-success fs-3 ms-1" }, [
      _c("i", { staticClass: "bi bi-arrow-right" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "text-success fs-3" }, [
      _c("i", { staticClass: "bi bi-wallet2" }),
    ])
  },
]
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY29yZS9yZXNvdXJjZXNfc3JjX2NvbXBvbmVudHNfd2FsbGV0c19NYWluV2FsbGV0RGV0YWlsX3Z1ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVrQkE7QUFDc0Q7QUFDdEQsaUVBQWU7RUFDZkEsb0NBREE7RUFFQTtFQUNBQztJQUFBO0VBQUEsQ0FIQTtFQUtBO0VBQ0FDLElBTkEsa0JBTUE7SUFDQTtNQUNBQyxPQURBO01BRUFDLFdBRkE7TUFHQUMsYUFIQTtNQUlBQyxRQUpBO01BS0FDLGNBTEE7TUFNQUMsTUFOQTtNQU9BQyxnQkFQQTtNQVFBQyxVQVJBO01BU0FDLG1CQVRBO01BVUFDLHFCQVZBO01B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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsOEhBQThIO0FBQ3ZLO0FBQ0EsY0FBYztBQUNkO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGFBQWE7QUFDMUIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsY0FBYztBQUNuQyxzQkFBc0IsY0FBYztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsVUFBVTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdFQUF3RSxFQUFFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxxQkFBcUI7QUFDckIsOENBQThDO0FBQzlDO0FBQ0EsWUFBWSxvQkFBb0I7QUFDaEMsWUFBWSxlQUFlO0FBQzNCLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEIsWUFBWSxxQkFBcUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztB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QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxzQ0FBc0M7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQyx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtDQUFrQztBQUMxRCxnQkFBZ0IsOEJBQThCO0FBQzlDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlEQUFpRDtBQUN4RSxnQkFBZ0Isa0NBQWtDO0FBQ2xEO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlEQUFpRDtBQUN4RSxnQkFBZ0Isa0NBQWtDO0FBQ2xEO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtDQUFrQztBQUMxRCxnQkFBZ0IsOEJBQThCO0FBQzlDO0FBQ0EsR0FBRztBQUNIO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL3NyYy9jb21wb25lbnRzL3dhbGxldHMvTWFpbldhbGxldERldGFpbC52dWUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3FyY29kZS1qcy1wYWNrYWdlL3FyY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXFyY29kZS1jb21wb25lbnQvc3JjL1FSQ29kZS52dWUiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy92dWUtcXJjb2RlLWNvbXBvbmVudC9zcmMvUVJDb2RlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc3JjL2NvbXBvbmVudHMvd2FsbGV0cy9NYWluV2FsbGV0RGV0YWlsLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc3JjL2NvbXBvbmVudHMvd2FsbGV0cy9NYWluV2FsbGV0RGV0YWlsLnZ1ZT80ODAwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtcXJjb2RlLWNvbXBvbmVudC9zcmMvUVJDb2RlLnZ1ZT9hZjQ2Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zcmMvY29tcG9uZW50cy93YWxsZXRzL01haW5XYWxsZXREZXRhaWwudnVlPzQ1NmQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1xcmNvZGUtY29tcG9uZW50L3NyYy9RUkNvZGUudnVlPzRhN2UiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL3NyYy9jb21wb25lbnRzL3dhbGxldHMvTWFpbldhbGxldERldGFpbC52dWU/NGJjYyJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQgbWItMVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgOmNsYXNzPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF0LnRyYWRpbmcucHJhY3RpY2UgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhdC50cmFkaW5nLnByYWN0aWNlICE9IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICcganVzdGlmeS1jb250ZW50LWJldHdlZW4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnIGp1c3RpZnktY29udGVudC1zdGFydCdcbiAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJ3YWwuc3ltYm9sICE9IG51bGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJhdmF0YXItY29udGVudCBtZS0xIGQtbm9uZSBkLXNtLWJsb2NrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDpzcmM9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWwuc3ltYm9sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJy9hc3NldHMvaW1hZ2VzL2NyeXB0b0N1cnJlbmN5LycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbC5zeW1ib2wudG9Mb3dlckNhc2UoKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5wbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJy9tYXJrZXQvbm90aWZpY2F0aW9uLnBuZydcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDx2dWUtc2tlbGV0b24tbG9hZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaXJjbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOndpZHRoPVwiNjRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOmhlaWdodD1cIjY0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbj1cImZhZGVcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cIndhbC5zeW1ib2wgIT0gbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZ3LWJvbGQgZnMtNCBkLW5vbmUgZC1sZy1ibG9ja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA+e3sgd2FsLnN5bWJvbCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1pZj1cImFwaSA9PSAxXCI+e3sgdHlwZS50b1VwcGVyQ2FzZSgpIH19IDwvc3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgPnt7ICR0KFwiV2FsbGV0XCIpIH19PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHZ1ZS1za2VsZXRvbi1sb2FkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkLW5vbmUgZC1sZy1ibG9ja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6d2lkdGg9XCIxMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOmhlaWdodD1cIjEwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbj1cImZhZGVcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtc3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXQudHJhZGluZy5wcmFjdGljZSAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhdC50cmFkaW5nLnByYWN0aWNlICE9IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWJzLXRvZ2dsZT1cIm1vZGFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWJzLXRhcmdldD1cIiNkZXBvc2l0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBtZS0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJpIGJpLXdhbGxldDJcIj48L2k+IHt7ICR0KFwiRGVwb3NpdFwiKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1icy10b2dnbGU9XCJtb2RhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1icy10YXJnZXQ9XCIjd2l0aGRyYXdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJpIGJpLWpvdXJuYWwtYXJyb3ctZG93blwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyAkdChcIldpdGhkcmF3XCIpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZCBtYi0wXCIgaWQ9XCJ0YWJsZS1ob3Zlci1yb3dcIiBzdHlsZT1cIm92ZXJmbG93OiBhdXRvXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIj57eyAkdChcIldhbGxldCBUcmFuc2FjdGlvbnNcIikgfX08L2g0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0YWJsZS1yZXNwb25zaXZlXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJtaW4taGVpZ2h0OiA1N3ZoOyBtYXgtaGVpZ2h0OiA1N3ZoOyBvdmVyZmxvdy15OiBhdXRvXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlRml4SGVhZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPnt7ICR0KFwiVHlwZVwiKSB9fTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD57eyAkdChcIkluZm9cIikgfX08L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+e3sgJHQoXCJUcmFuc2FjdGlvblwiKSB9fTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD57eyAkdChcIlN0YXR1c1wiKSB9fTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwid2FsX3RyeCAhPSBudWxsICYmIHdhbF90cngubGVuZ3RoID4gMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cIndhbF90cngubGVuZ3RoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIgdi1mb3I9XCIodHJ4LCBpbmRleCkgaW4gd2FsX3RyeFwiIDprZXk9XCJpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJhdmF0YXIgYmctbGlnaHQtcHJpbWFyeSByb3VuZGVkIGZsb2F0LXN0YXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIm1heC1oZWlnaHQ6IDMwcHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdmF0YXItY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeC5vcGVyYXRpb25UeXBlID09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdERVBPU0lUJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeC5vcGVyYXRpb25UeXBlID09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdQQVlNRU5UJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1zdWNjZXNzIGZzLTMgYmkgYmktd2FsbGV0MlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWVsc2UtaWY9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cngub3BlcmF0aW9uVHlwZSA9PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdXSVRIRFJBV0FMJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1kYW5nZXIgZnMtM1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PGkgY2xhc3M9XCJiaSBiaS1jYXNoXCI+PC9pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtd2FybmluZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyAkdChcIkFtb3VudFwiKSB9fTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWlmPVwidHJ4LmFtb3VudCAhPSAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IHRyeC5hbW91bnQgfCB0b01vbmV5KDQpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IHdhbC5zeW1ib2wgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXdhcm5pbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgJHQoXCJWYWx1ZVwiKSB9fSAoVVNEKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ4Lm1hcmtldFZhbHVlLmFtb3VudCB8IHRvTW9uZXkoNClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC13YXJuaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPnt7ICR0KFwiUmVmZXJlbmNlIElEXCIpIH19OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyB0cngucmVmZXJlbmNlIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ4Lm9wZXJhdGlvblR5cGUgPT0gJ0RFUE9TSVQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeC5vcGVyYXRpb25UeXBlID09ICdQQVlNRU5UJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJhdmF0YXItZ3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1zdWNjZXNzIGZzLTNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PGkgY2xhc3M9XCJiaSBiaS13YWxsZXQyXCI+PC9pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibXktMCBteC0yIHRleHQtc3VjY2VzcyBmcy0zIG1zLXFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJpIGJpLWFycm93LXJpZ2h0XCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1icy10b2dnbGU9XCJ0b29sdGlwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1wb3B1cD1cInRvb2x0aXAtY3VzdG9tXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1icy1wbGFjZW1lbnQ9XCJ0b3BcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImF2YXRhciBwdWxsLXVwIG15LTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dGl0bGU9XCJ0cnguc3ltYm9sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYXZhdGFyLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnNyYz1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeC5zeW1ib2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnL2Fzc2V0cy9pbWFnZXMvY3J5cHRvQ3VycmVuY3kvJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ4LnN5bWJvbC50b0xvd2VyQ2FzZSgpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLnBuZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnL21hcmtldC9ub3RpZmljYXRpb24ucG5nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIkF2YXRhclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWVsc2UtaWY9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ4Lm9wZXJhdGlvblR5cGUgPT0gJ1dJVEhEUkFXQUwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImF2YXRhci1ncm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWJzLXRvZ2dsZT1cInRvb2x0aXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXBvcHVwPVwidG9vbHRpcC1jdXN0b21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWJzLXBsYWNlbWVudD1cInRvcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYXZhdGFyIHB1bGwtdXAgbXktMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0aXRsZT1cInRyeC5hZGRyZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYXZhdGFyLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnNyYz1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbC5zeW1ib2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnL2Fzc2V0cy9pbWFnZXMvY3J5cHRvQ3VycmVuY3kvJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsLnN5bWJvbC50b0xvd2VyQ2FzZSgpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLnBuZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnL21hcmtldC9ub3RpZmljYXRpb24ucG5nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIkF2YXRhclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm15LTAgbXgtMiB0ZXh0LXN1Y2Nlc3MgZnMtMyBtcy0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaSBiaS1hcnJvdy1yaWdodFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtc3VjY2VzcyBmcy0zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjxpIGNsYXNzPVwiYmkgYmktd2FsbGV0MlwiPjwvaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgdHJ4LmNyZWF0ZWQgfCB0b0RhdGUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keSB2LWVsc2U+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1tdXRlZCB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzcGFuPVwiMTAwJVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9XCIxMjhweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCIxMjhweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9hc3NldHMuc3RhdGljaW1nLmNvbS9wcm8vMi4wLjQvaW1hZ2VzL2VtcHR5LnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIlwiPnt7ICR0KFwiTm8gRGF0YSBGb3VuZFwiKSB9fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJtb2RhbCBmYWRlXCJcbiAgICAgICAgICAgIGlkPVwiZGVwb3NpdFwiXG4gICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT1cImRlcG9zaXRcIlxuICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyBtb2RhbC1kaWFsb2ctY2VudGVyZWQgbW9kYWwtbGdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJhZGRyZXNzZXMgIT0gbnVsbFwiIGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGJnLXRyYW5zcGFyZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDUgY2xhc3M9XCJtb2RhbC10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ICR0KFwiU2VsZWN0IERlcG9zaXQgTmV0d29ya1wiKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0bi1jbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1icy1kaXNtaXNzPVwibW9kYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJDbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXYgbmF2LXRhYnNcIiByb2xlPVwidGFibGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtZm9yPVwiKHdhbGxldCwga2V5LCBpbmRleCkgaW4gYWRkcmVzc2VzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJuZXR3b3Jrcy5pbmRleE9mKGtleSkgIT09IC0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJuYXYtaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJuYXYtbGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Y2xhc3M9XCJpbmRleCA9PSAwID8gJ2FjdGl2ZScgOiAnJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aWQ9XCJrZXkgKyAnLXRhYidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1icy10b2dnbGU9XCJ0YWJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmRhdGEtYnMtdGFyZ2V0PVwiJyMnICsga2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJ0YWJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphcmlhLWNvbnRyb2xzPVwia2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID57eyBrZXkgfX08L2FcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cIih3YWxsZXQsIGtleSwgaW5kZXgpIGluIGFkZHJlc3Nlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cIm5ldHdvcmtzLmluZGV4T2Yoa2V5KSAhPT0gLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRhYi1wYW5lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmNsYXNzPVwiaW5kZXggPT0gMCA/ICdhY3RpdmUnIDogJydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aWQ9XCJrZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwidGFicGFuZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgcGItMyBweC1zbS0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy0zIGNvbC1tZC01XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbC1sYWJlbCBoNlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPnt7ICR0KFwiVG9cIikgfX08L2xhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cXItY29kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnNpemU9XCIxNTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnRleHQ9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsZXQuYWRkcmVzc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHdhbGxldC5hZGRyZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L3FyLWNvZGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy05IGNvbC1tZC03XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbC1sYWJlbCBoNlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yPVwicmVjaWV2aW5nX2FkZHJlc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID57e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdChcIldhbGxldCBBZGRyZXNzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX08L2xhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaWV2aW5nX2FkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dmFsdWU9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbGV0LmFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gd2FsbGV0LmFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gbXQtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHQoXCJUcmFuc2ZlciBMaW1pdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0KFwiVW5saW1pdGVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxociAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4uaGFzX21lbW8gPT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbGV0Lm1lbW8gIT0gJycgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbGV0Lm1lbW8gIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0KFwiTWVtb1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC13YXJuaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsZXQubWVtb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gd2FsbGV0Lm1lbW9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX08L3NwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxociAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ICR0KFwiVGhpcyBpcyBhXCIpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gOnJlZj1cImtleVwiIGNsYXNzPVwidGV4dC1pbmZvXCI+e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5ID8ga2V5IDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDaGFpbiBhZGRyZXNzLiBEbyBub3Qgc2VuZCBhbnkgb3RoZXIgQ2hhaW4gdG8gdGhpcyBhZGRyZXNzIG9yIHlvdXIgZnVuZHMgbWF5IGJlIGxvc3QuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwibW9kYWwgZmFkZVwiXG4gICAgICAgICAgICBpZD1cIndpdGhkcmF3XCJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PVwid2l0aGRyYXdcIlxuICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyBtb2RhbC1kaWFsb2ctY2VudGVyZWQgbW9kYWwtbGdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyIGJnLXRyYW5zcGFyZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDUgY2xhc3M9XCJtb2RhbC10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ICR0KFwiU2VsZWN0IFdpdGhkcmF3IE5ldHdvcmtcIikgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidG4tY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYnMtZGlzbWlzcz1cIm1vZGFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiQ2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdi10YWJzXCIgcm9sZT1cInRhYmxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cIih3YWxsZXQsIGtleSwgaW5kZXgpIGluIGFkZHJlc3Nlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwibmV0d29ya3MuaW5kZXhPZihrZXkpICE9PSAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibmF2LWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibmF2LWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmNsYXNzPVwiaW5kZXggPT0gMCA/ICdhY3RpdmUnIDogJydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmlkPVwia2V5ICsgJy13aXRoZHJhdy10YWInXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYnMtdG9nZ2xlPVwidGFiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpkYXRhLWJzLXRhcmdldD1cIicjJyArIGtleSArICctd2l0aGRyYXcnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJ0YWJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphcmlhLWNvbnRyb2xzPVwia2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID57eyBrZXkgfX08L2FcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cIih3YWxsZXQsIGtleSwgaW5kZXgpIGluIGFkZHJlc3Nlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cIm5ldHdvcmtzLmluZGV4T2Yoa2V5KSAhPT0gLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRhYi1wYW5lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmNsYXNzPVwiaW5kZXggPT0gMCA/ICdhY3RpdmUnIDogJydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aWQ9XCJrZXkgKyAnLXdpdGhkcmF3J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJ0YWJwYW5lbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJhZGQtbmV3LXJlY29yZCBtb2RhbC1jb250ZW50IHB0LTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQHN1Ym1pdC5wcmV2ZW50PVwiV2l0aGRyYXcoa2V5KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5IHBiLTMgcHgtc20tM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wtbGFiZWwgaDZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yPVwid2FsbGV0X2JhbGFuY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHQoXCJXYWxsZXQgQmFsYW5jZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX08L2xhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dmFsdWU9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsZXQuYmFsYW5jZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeW1ib2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcj1cIndpdGhkcmF3X2FkZHJlc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHQoXCJXYWxsZXQgQWRkcmVzc1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX08L3NwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJ3aXRoZHJhd19hZGRyZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3I9XCJhbW91bnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID57eyAkdChcIkFtb3VudFwiKSB9fTwvc3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJ3aXRoZHJhd19hbW91bnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDptaW49XCJ0b2tlbi53aXRoZHJhd19taW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpzdGVwPVwidG9rZW4ud2l0aGRyYXdfbWluXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bWF4PVwidG9rZW4ud2l0aGRyYXdfbWF4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c21hbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID57eyAkdChcIk1pblwiKSB9fTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC13YXJuaW5nXCI+e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi53aXRoZHJhd19taW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB0b01vbmV5KDIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8ge3sgJHQoXCJNYXhcIikgfX06XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtd2FybmluZ1wiPnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4ud2l0aGRyYXdfbWF4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdG9Nb25leSgyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc21hbGw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm15LTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5oYXNfbWVtbyA9PSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3I9XCJtZW1vXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+e3sgJHQoXCJNZW1vXCIpIH19PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJ3aXRoZHJhd19tZW1vXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3I9XCJmZWVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID57eyAkdChcIkZlZXNcIikgfX08L3NwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp2YWx1ZT1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuLndpdGhkcmF3X2ZlZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5zeW1ib2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cIm10LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyAkdChcIlBsZWFzZSBtYWtlIHN1cmUgeW91IGhhdmVcIikgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyB0b2tlbi5jaGFpbiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJCYWxhbmNlIGZvciB0aGUgd2l0aGRyYXdhbCB0byBiZSBwcm9jZXNzZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgdGV4dC1lbmRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cImxvYWRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgJHQoXCJXaXRoZHJhd1wiKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbi8vIGNvbXBvbmVudFxuaW1wb3J0IFZ1ZVFSQ29kZUNvbXBvbmVudCBmcm9tIFwidnVlLXFyY29kZS1jb21wb25lbnRcIjtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwcm9wczogW1widHlwZVwiLCBcInN5bWJvbFwiLCBcImFkZHJlc3NcIl0sXG4gICAgLy8gY29tcG9uZW50IGxpc3RcbiAgICBjb21wb25lbnRzOiB7IFwicXItY29kZVwiOiBWdWVRUkNvZGVDb21wb25lbnQgfSxcblxuICAgIC8vIGNvbXBvbmVudCBkYXRhXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdhbDoge30sXG4gICAgICAgICAgICB3YWxfdHJ4OiB7fSxcbiAgICAgICAgICAgIGFkZHJlc3Nlczoge30sXG4gICAgICAgICAgICBnbmw6IGdubCxcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgYXBpOiAxLFxuICAgICAgICAgICAgcGF0aG5hbWU6IFwibWFpblwiLFxuICAgICAgICAgICAgcGxhdDogcGxhdCxcbiAgICAgICAgICAgIHdpdGhkcmF3X21lbW86IG51bGwsXG4gICAgICAgICAgICB3aXRoZHJhd19hbW91bnQ6IG51bGwsXG4gICAgICAgICAgICB3aXRoZHJhd19hZGRyZXNzOiBudWxsLFxuICAgICAgICAgICAgbmV0d29yazogbnVsbCxcbiAgICAgICAgICAgIHRva2VuOiBudWxsLFxuICAgICAgICAgICAgbmV0d29ya3M6IG51bGwsXG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvLyBjdXN0b20gbWV0aG9kc1xuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgZmV0Y2hEYXRhKCkge1xuICAgICAgICAgICAgdGhpcy4kaHR0cFxuICAgICAgICAgICAgICAgIC5wb3N0KFxuICAgICAgICAgICAgICAgICAgICBcIi91c2VyL2ZldGNoL2Vjby93YWxsZXQvbWFpbi9cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bWJvbCArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIi9cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZHJlc3NcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLndhbCA9IHJlc3BvbnNlLmRhdGEud2FsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLndhbF90cnggPSByZXNwb25zZS5kYXRhLndhbF90cngpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMudG9rZW4gPSByZXNwb25zZS5kYXRhLnRva2VuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLm5ldHdvcmtzID0gcmVzcG9uc2UuZGF0YS5uZXR3b3JrcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5hZGRyZXNzZXMgPSByZXNwb25zZS5kYXRhLmFkZHJlc3Nlcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoXCJSZWZyZXNoTWFpbldhbGxldFwiLCByZXNwb25zZS5kYXRhLndhbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZldGNoV2FsbGV0VHJ4KCkge1xuICAgICAgICAgICAgdGhpcy4kaHR0cFxuICAgICAgICAgICAgICAgIC5wb3N0KFxuICAgICAgICAgICAgICAgICAgICBcIi91c2VyL2ZldGNoL2Vjby93YWxsZXQvbWFpbi9cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bWJvbCArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIi9cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZHJlc3NcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLndhbF90cnggPSByZXNwb25zZS5kYXRhLndhbF90cngpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdChcIlJlZnJlc2hNYWluV2FsbGV0XCIsIHJlc3BvbnNlLmRhdGEud2FsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgV2l0aGRyYXcoY2hhaW4pIHtcbiAgICAgICAgICAgICh0aGlzLmxvYWRpbmcgPSB0cnVlKSxcbiAgICAgICAgICAgICAgICB0aGlzLiRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KFwiL3VzZXIvZWNvL3dhbGxldC93aXRoZHJhd1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzeW1ib2w6IHRoaXMuc3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2l0aGRyYXdfYWRkcmVzczogdGhpcy53aXRoZHJhd19hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVtbzogdGhpcy53aXRoZHJhd19tZW1vLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiB0aGlzLndpdGhkcmF3X2Ftb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYWluOiBjaGFpbixcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR0b2FzdFtyZXNwb25zZS5kYXRhLnR5cGVdKHJlc3BvbnNlLmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHRvYXN0LmVycm9yKGVycm9yLnJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZldGNoRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaFdhbGxldFRyeCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI3dpdGhkcmF3XCIpLm1vZGFsKFwiaGlkZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vIG9uIGNvbXBvbmVudCBjcmVhdGVkXG4gICAgY3JlYXRlZCgpIHtcbiAgICAgICAgdGhpcy5mZXRjaERhdGEoKTtcbiAgICB9LFxuXG4gICAgLy8gb24gY29tcG9uZW50IG1vdW50ZWRcbiAgICBtb3VudGVkKCkge30sXG5cbiAgICAvLyBvbiBjb21wb25lbnQgZGVzdHJveWVkXG4gICAgZGVzdHJveWVkKCkge30sXG59O1xuPC9zY3JpcHQ+XG4iLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIC0gVXNpbmcgdGhlICdRUkNvZGUgZm9yIEphdmFzY3JpcHQgbGlicmFyeSdcbiAqIC0gRml4ZWQgZGF0YXNldCBvZiAnUVJDb2RlIGZvciBKYXZhc2NyaXB0IGxpYnJhcnknIGZvciBzdXBwb3J0IGZ1bGwtc3BlYy5cbiAqIC0gdGhpcyBsaWJyYXJ5IGhhcyBubyBkZXBlbmRlbmNpZXMuXG4gKiBcbiAqIEBhdXRob3IgZGF2aWRzaGltanNcbiAqIEBzZWUgPGEgaHJlZj1cImh0dHA6Ly93d3cuZC1wcm9qZWN0LmNvbS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5odHRwOi8vd3d3LmQtcHJvamVjdC5jb20vPC9hPlxuICogQHNlZSA8YSBocmVmPVwiaHR0cDovL2plcm9tZWV0aWVubmUuZ2l0aHViLmNvbS9qcXVlcnktcXJjb2RlL1wiIHRhcmdldD1cIl9ibGFua1wiPmh0dHA6Ly9qZXJvbWVldGllbm5lLmdpdGh1Yi5jb20vanF1ZXJ5LXFyY29kZS88L2E+XG4gKi9cbnZhciBRUkNvZGU7XG5cbihmdW5jdGlvbiAoKSB7XG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFFSQ29kZSBmb3IgSmF2YVNjcmlwdFxuXHQvL1xuXHQvLyBDb3B5cmlnaHQgKGMpIDIwMDkgS2F6dWhpa28gQXJhc2Vcblx0Ly9cblx0Ly8gVVJMOiBodHRwOi8vd3d3LmQtcHJvamVjdC5jb20vXG5cdC8vXG5cdC8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcblx0Ly8gICBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHQvL1xuXHQvLyBUaGUgd29yZCBcIlFSIENvZGVcIiBpcyByZWdpc3RlcmVkIHRyYWRlbWFyayBvZiBcblx0Ly8gREVOU08gV0FWRSBJTkNPUlBPUkFURURcblx0Ly8gICBodHRwOi8vd3d3LmRlbnNvLXdhdmUuY29tL3FyY29kZS9mYXFwYXRlbnQtZS5odG1sXG5cdC8vXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdGZ1bmN0aW9uIFFSOGJpdEJ5dGUoZGF0YSkge1xuXHRcdHRoaXMubW9kZSA9IFFSTW9kZS5NT0RFXzhCSVRfQllURTtcblx0XHR0aGlzLmRhdGEgPSBkYXRhO1xuXHRcdHRoaXMucGFyc2VkRGF0YSA9IFtdO1xuXG5cdFx0Ly8gQWRkZWQgdG8gc3VwcG9ydCBVVEYtOCBDaGFyYWN0ZXJzXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmRhdGEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHR2YXIgYnl0ZUFycmF5ID0gW107XG5cdFx0XHR2YXIgY29kZSA9IHRoaXMuZGF0YS5jaGFyQ29kZUF0KGkpO1xuXG5cdFx0XHRpZiAoY29kZSA+IDB4MTAwMDApIHtcblx0XHRcdFx0Ynl0ZUFycmF5WzBdID0gMHhGMCB8ICgoY29kZSAmIDB4MUMwMDAwKSA+Pj4gMTgpO1xuXHRcdFx0XHRieXRlQXJyYXlbMV0gPSAweDgwIHwgKChjb2RlICYgMHgzRjAwMCkgPj4+IDEyKTtcblx0XHRcdFx0Ynl0ZUFycmF5WzJdID0gMHg4MCB8ICgoY29kZSAmIDB4RkMwKSA+Pj4gNik7XG5cdFx0XHRcdGJ5dGVBcnJheVszXSA9IDB4ODAgfCAoY29kZSAmIDB4M0YpO1xuXHRcdFx0fSBlbHNlIGlmIChjb2RlID4gMHg4MDApIHtcblx0XHRcdFx0Ynl0ZUFycmF5WzBdID0gMHhFMCB8ICgoY29kZSAmIDB4RjAwMCkgPj4+IDEyKTtcblx0XHRcdFx0Ynl0ZUFycmF5WzFdID0gMHg4MCB8ICgoY29kZSAmIDB4RkMwKSA+Pj4gNik7XG5cdFx0XHRcdGJ5dGVBcnJheVsyXSA9IDB4ODAgfCAoY29kZSAmIDB4M0YpO1xuXHRcdFx0fSBlbHNlIGlmIChjb2RlID4gMHg4MCkge1xuXHRcdFx0XHRieXRlQXJyYXlbMF0gPSAweEMwIHwgKChjb2RlICYgMHg3QzApID4+PiA2KTtcblx0XHRcdFx0Ynl0ZUFycmF5WzFdID0gMHg4MCB8IChjb2RlICYgMHgzRik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRieXRlQXJyYXlbMF0gPSBjb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnBhcnNlZERhdGEucHVzaChieXRlQXJyYXkpO1xuXHRcdH1cblxuXHRcdHRoaXMucGFyc2VkRGF0YSA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIHRoaXMucGFyc2VkRGF0YSk7XG5cblx0XHRpZiAodGhpcy5wYXJzZWREYXRhLmxlbmd0aCAhPSB0aGlzLmRhdGEubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLnBhcnNlZERhdGEudW5zaGlmdCgxOTEpO1xuXHRcdFx0dGhpcy5wYXJzZWREYXRhLnVuc2hpZnQoMTg3KTtcblx0XHRcdHRoaXMucGFyc2VkRGF0YS51bnNoaWZ0KDIzOSk7XG5cdFx0fVxuXHR9XG5cblx0UVI4Yml0Qnl0ZS5wcm90b3R5cGUgPSB7XG5cdFx0Z2V0TGVuZ3RoOiBmdW5jdGlvbiAoYnVmZmVyKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJzZWREYXRhLmxlbmd0aDtcblx0XHR9LFxuXHRcdHdyaXRlOiBmdW5jdGlvbiAoYnVmZmVyKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMucGFyc2VkRGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0YnVmZmVyLnB1dCh0aGlzLnBhcnNlZERhdGFbaV0sIDgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRmdW5jdGlvbiBRUkNvZGVNb2RlbCh0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3RMZXZlbCkge1xuXHRcdHRoaXMudHlwZU51bWJlciA9IHR5cGVOdW1iZXI7XG5cdFx0dGhpcy5lcnJvckNvcnJlY3RMZXZlbCA9IGVycm9yQ29ycmVjdExldmVsO1xuXHRcdHRoaXMubW9kdWxlcyA9IG51bGw7XG5cdFx0dGhpcy5tb2R1bGVDb3VudCA9IDA7XG5cdFx0dGhpcy5kYXRhQ2FjaGUgPSBudWxsO1xuXHRcdHRoaXMuZGF0YUxpc3QgPSBbXTtcblx0fVxuXG5cdFFSQ29kZU1vZGVsLnByb3RvdHlwZT17YWRkRGF0YTpmdW5jdGlvbihkYXRhKXt2YXIgbmV3RGF0YT1uZXcgUVI4Yml0Qnl0ZShkYXRhKTt0aGlzLmRhdGFMaXN0LnB1c2gobmV3RGF0YSk7dGhpcy5kYXRhQ2FjaGU9bnVsbDt9LGlzRGFyazpmdW5jdGlvbihyb3csY29sKXtpZihyb3c8MHx8dGhpcy5tb2R1bGVDb3VudDw9cm93fHxjb2w8MHx8dGhpcy5tb2R1bGVDb3VudDw9Y29sKXt0aHJvdyBuZXcgRXJyb3Iocm93K1wiLFwiK2NvbCk7fVxuXHRyZXR1cm4gdGhpcy5tb2R1bGVzW3Jvd11bY29sXTt9LGdldE1vZHVsZUNvdW50OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubW9kdWxlQ291bnQ7fSxtYWtlOmZ1bmN0aW9uKCl7dGhpcy5tYWtlSW1wbChmYWxzZSx0aGlzLmdldEJlc3RNYXNrUGF0dGVybigpKTt9LG1ha2VJbXBsOmZ1bmN0aW9uKHRlc3QsbWFza1BhdHRlcm4pe3RoaXMubW9kdWxlQ291bnQ9dGhpcy50eXBlTnVtYmVyKjQrMTc7dGhpcy5tb2R1bGVzPW5ldyBBcnJheSh0aGlzLm1vZHVsZUNvdW50KTtmb3IodmFyIHJvdz0wO3Jvdzx0aGlzLm1vZHVsZUNvdW50O3JvdysrKXt0aGlzLm1vZHVsZXNbcm93XT1uZXcgQXJyYXkodGhpcy5tb2R1bGVDb3VudCk7Zm9yKHZhciBjb2w9MDtjb2w8dGhpcy5tb2R1bGVDb3VudDtjb2wrKyl7dGhpcy5tb2R1bGVzW3Jvd11bY29sXT1udWxsO319XG5cdHRoaXMuc2V0dXBQb3NpdGlvblByb2JlUGF0dGVybigwLDApO3RoaXMuc2V0dXBQb3NpdGlvblByb2JlUGF0dGVybih0aGlzLm1vZHVsZUNvdW50LTcsMCk7dGhpcy5zZXR1cFBvc2l0aW9uUHJvYmVQYXR0ZXJuKDAsdGhpcy5tb2R1bGVDb3VudC03KTt0aGlzLnNldHVwUG9zaXRpb25BZGp1c3RQYXR0ZXJuKCk7dGhpcy5zZXR1cFRpbWluZ1BhdHRlcm4oKTt0aGlzLnNldHVwVHlwZUluZm8odGVzdCxtYXNrUGF0dGVybik7aWYodGhpcy50eXBlTnVtYmVyPj03KXt0aGlzLnNldHVwVHlwZU51bWJlcih0ZXN0KTt9XG5cdGlmKHRoaXMuZGF0YUNhY2hlPT1udWxsKXt0aGlzLmRhdGFDYWNoZT1RUkNvZGVNb2RlbC5jcmVhdGVEYXRhKHRoaXMudHlwZU51bWJlcix0aGlzLmVycm9yQ29ycmVjdExldmVsLHRoaXMuZGF0YUxpc3QpO31cblx0dGhpcy5tYXBEYXRhKHRoaXMuZGF0YUNhY2hlLG1hc2tQYXR0ZXJuKTt9LHNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm46ZnVuY3Rpb24ocm93LGNvbCl7Zm9yKHZhciByPS0xO3I8PTc7cisrKXtpZihyb3crcjw9LTF8fHRoaXMubW9kdWxlQ291bnQ8PXJvdytyKWNvbnRpbnVlO2Zvcih2YXIgYz0tMTtjPD03O2MrKyl7aWYoY29sK2M8PS0xfHx0aGlzLm1vZHVsZUNvdW50PD1jb2wrYyljb250aW51ZTtpZigoMDw9ciYmcjw9NiYmKGM9PTB8fGM9PTYpKXx8KDA8PWMmJmM8PTYmJihyPT0wfHxyPT02KSl8fCgyPD1yJiZyPD00JiYyPD1jJiZjPD00KSl7dGhpcy5tb2R1bGVzW3JvdytyXVtjb2wrY109dHJ1ZTt9ZWxzZXt0aGlzLm1vZHVsZXNbcm93K3JdW2NvbCtjXT1mYWxzZTt9fX19LGdldEJlc3RNYXNrUGF0dGVybjpmdW5jdGlvbigpe3ZhciBtaW5Mb3N0UG9pbnQ9MDt2YXIgcGF0dGVybj0wO2Zvcih2YXIgaT0wO2k8ODtpKyspe3RoaXMubWFrZUltcGwodHJ1ZSxpKTt2YXIgbG9zdFBvaW50PVFSVXRpbC5nZXRMb3N0UG9pbnQodGhpcyk7aWYoaT09MHx8bWluTG9zdFBvaW50Pmxvc3RQb2ludCl7bWluTG9zdFBvaW50PWxvc3RQb2ludDtwYXR0ZXJuPWk7fX1cblx0cmV0dXJuIHBhdHRlcm47fSxjcmVhdGVNb3ZpZUNsaXA6ZnVuY3Rpb24odGFyZ2V0X21jLGluc3RhbmNlX25hbWUsZGVwdGgpe3ZhciBxcl9tYz10YXJnZXRfbWMuY3JlYXRlRW1wdHlNb3ZpZUNsaXAoaW5zdGFuY2VfbmFtZSxkZXB0aCk7dmFyIGNzPTE7dGhpcy5tYWtlKCk7Zm9yKHZhciByb3c9MDtyb3c8dGhpcy5tb2R1bGVzLmxlbmd0aDtyb3crKyl7dmFyIHk9cm93KmNzO2Zvcih2YXIgY29sPTA7Y29sPHRoaXMubW9kdWxlc1tyb3ddLmxlbmd0aDtjb2wrKyl7dmFyIHg9Y29sKmNzO3ZhciBkYXJrPXRoaXMubW9kdWxlc1tyb3ddW2NvbF07aWYoZGFyayl7cXJfbWMuYmVnaW5GaWxsKDAsMTAwKTtxcl9tYy5tb3ZlVG8oeCx5KTtxcl9tYy5saW5lVG8oeCtjcyx5KTtxcl9tYy5saW5lVG8oeCtjcyx5K2NzKTtxcl9tYy5saW5lVG8oeCx5K2NzKTtxcl9tYy5lbmRGaWxsKCk7fX19XG5cdHJldHVybiBxcl9tYzt9LHNldHVwVGltaW5nUGF0dGVybjpmdW5jdGlvbigpe2Zvcih2YXIgcj04O3I8dGhpcy5tb2R1bGVDb3VudC04O3IrKyl7aWYodGhpcy5tb2R1bGVzW3JdWzZdIT1udWxsKXtjb250aW51ZTt9XG5cdHRoaXMubW9kdWxlc1tyXVs2XT0ociUyPT0wKTt9XG5cdGZvcih2YXIgYz04O2M8dGhpcy5tb2R1bGVDb3VudC04O2MrKyl7aWYodGhpcy5tb2R1bGVzWzZdW2NdIT1udWxsKXtjb250aW51ZTt9XG5cdHRoaXMubW9kdWxlc1s2XVtjXT0oYyUyPT0wKTt9fSxzZXR1cFBvc2l0aW9uQWRqdXN0UGF0dGVybjpmdW5jdGlvbigpe3ZhciBwb3M9UVJVdGlsLmdldFBhdHRlcm5Qb3NpdGlvbih0aGlzLnR5cGVOdW1iZXIpO2Zvcih2YXIgaT0wO2k8cG9zLmxlbmd0aDtpKyspe2Zvcih2YXIgaj0wO2o8cG9zLmxlbmd0aDtqKyspe3ZhciByb3c9cG9zW2ldO3ZhciBjb2w9cG9zW2pdO2lmKHRoaXMubW9kdWxlc1tyb3ddW2NvbF0hPW51bGwpe2NvbnRpbnVlO31cblx0Zm9yKHZhciByPS0yO3I8PTI7cisrKXtmb3IodmFyIGM9LTI7Yzw9MjtjKyspe2lmKHI9PS0yfHxyPT0yfHxjPT0tMnx8Yz09Mnx8KHI9PTAmJmM9PTApKXt0aGlzLm1vZHVsZXNbcm93K3JdW2NvbCtjXT10cnVlO31lbHNle3RoaXMubW9kdWxlc1tyb3crcl1bY29sK2NdPWZhbHNlO319fX19fSxzZXR1cFR5cGVOdW1iZXI6ZnVuY3Rpb24odGVzdCl7dmFyIGJpdHM9UVJVdGlsLmdldEJDSFR5cGVOdW1iZXIodGhpcy50eXBlTnVtYmVyKTtmb3IodmFyIGk9MDtpPDE4O2krKyl7dmFyIG1vZD0oIXRlc3QmJigoYml0cz4+aSkmMSk9PTEpO3RoaXMubW9kdWxlc1tNYXRoLmZsb29yKGkvMyldW2klMyt0aGlzLm1vZHVsZUNvdW50LTgtM109bW9kO31cblx0Zm9yKHZhciBpPTA7aTwxODtpKyspe3ZhciBtb2Q9KCF0ZXN0JiYoKGJpdHM+PmkpJjEpPT0xKTt0aGlzLm1vZHVsZXNbaSUzK3RoaXMubW9kdWxlQ291bnQtOC0zXVtNYXRoLmZsb29yKGkvMyldPW1vZDt9fSxzZXR1cFR5cGVJbmZvOmZ1bmN0aW9uKHRlc3QsbWFza1BhdHRlcm4pe3ZhciBkYXRhPSh0aGlzLmVycm9yQ29ycmVjdExldmVsPDwzKXxtYXNrUGF0dGVybjt2YXIgYml0cz1RUlV0aWwuZ2V0QkNIVHlwZUluZm8oZGF0YSk7Zm9yKHZhciBpPTA7aTwxNTtpKyspe3ZhciBtb2Q9KCF0ZXN0JiYoKGJpdHM+PmkpJjEpPT0xKTtpZihpPDYpe3RoaXMubW9kdWxlc1tpXVs4XT1tb2Q7fWVsc2UgaWYoaTw4KXt0aGlzLm1vZHVsZXNbaSsxXVs4XT1tb2Q7fWVsc2V7dGhpcy5tb2R1bGVzW3RoaXMubW9kdWxlQ291bnQtMTUraV1bOF09bW9kO319XG5cdGZvcih2YXIgaT0wO2k8MTU7aSsrKXt2YXIgbW9kPSghdGVzdCYmKChiaXRzPj5pKSYxKT09MSk7aWYoaTw4KXt0aGlzLm1vZHVsZXNbOF1bdGhpcy5tb2R1bGVDb3VudC1pLTFdPW1vZDt9ZWxzZSBpZihpPDkpe3RoaXMubW9kdWxlc1s4XVsxNS1pLTErMV09bW9kO31lbHNle3RoaXMubW9kdWxlc1s4XVsxNS1pLTFdPW1vZDt9fVxuXHR0aGlzLm1vZHVsZXNbdGhpcy5tb2R1bGVDb3VudC04XVs4XT0oIXRlc3QpO30sbWFwRGF0YTpmdW5jdGlvbihkYXRhLG1hc2tQYXR0ZXJuKXt2YXIgaW5jPS0xO3ZhciByb3c9dGhpcy5tb2R1bGVDb3VudC0xO3ZhciBiaXRJbmRleD03O3ZhciBieXRlSW5kZXg9MDtmb3IodmFyIGNvbD10aGlzLm1vZHVsZUNvdW50LTE7Y29sPjA7Y29sLT0yKXtpZihjb2w9PTYpY29sLS07d2hpbGUodHJ1ZSl7Zm9yKHZhciBjPTA7YzwyO2MrKyl7aWYodGhpcy5tb2R1bGVzW3Jvd11bY29sLWNdPT1udWxsKXt2YXIgZGFyaz1mYWxzZTtpZihieXRlSW5kZXg8ZGF0YS5sZW5ndGgpe2Rhcms9KCgoZGF0YVtieXRlSW5kZXhdPj4+Yml0SW5kZXgpJjEpPT0xKTt9XG5cdHZhciBtYXNrPVFSVXRpbC5nZXRNYXNrKG1hc2tQYXR0ZXJuLHJvdyxjb2wtYyk7aWYobWFzayl7ZGFyaz0hZGFyazt9XG5cdHRoaXMubW9kdWxlc1tyb3ddW2NvbC1jXT1kYXJrO2JpdEluZGV4LS07aWYoYml0SW5kZXg9PS0xKXtieXRlSW5kZXgrKztiaXRJbmRleD03O319fVxuXHRyb3crPWluYztpZihyb3c8MHx8dGhpcy5tb2R1bGVDb3VudDw9cm93KXtyb3ctPWluYztpbmM9LWluYzticmVhazt9fX19fTtRUkNvZGVNb2RlbC5QQUQwPTB4RUM7UVJDb2RlTW9kZWwuUEFEMT0weDExO1FSQ29kZU1vZGVsLmNyZWF0ZURhdGE9ZnVuY3Rpb24odHlwZU51bWJlcixlcnJvckNvcnJlY3RMZXZlbCxkYXRhTGlzdCl7dmFyIHJzQmxvY2tzPVFSUlNCbG9jay5nZXRSU0Jsb2Nrcyh0eXBlTnVtYmVyLGVycm9yQ29ycmVjdExldmVsKTt2YXIgYnVmZmVyPW5ldyBRUkJpdEJ1ZmZlcigpO2Zvcih2YXIgaT0wO2k8ZGF0YUxpc3QubGVuZ3RoO2krKyl7dmFyIGRhdGE9ZGF0YUxpc3RbaV07YnVmZmVyLnB1dChkYXRhLm1vZGUsNCk7YnVmZmVyLnB1dChkYXRhLmdldExlbmd0aCgpLFFSVXRpbC5nZXRMZW5ndGhJbkJpdHMoZGF0YS5tb2RlLHR5cGVOdW1iZXIpKTtkYXRhLndyaXRlKGJ1ZmZlcik7fVxuXHR2YXIgdG90YWxEYXRhQ291bnQ9MDtmb3IodmFyIGk9MDtpPHJzQmxvY2tzLmxlbmd0aDtpKyspe3RvdGFsRGF0YUNvdW50Kz1yc0Jsb2Nrc1tpXS5kYXRhQ291bnQ7fVxuXHRpZihidWZmZXIuZ2V0TGVuZ3RoSW5CaXRzKCk+dG90YWxEYXRhQ291bnQqOCl7dGhyb3cgbmV3IEVycm9yKFwiY29kZSBsZW5ndGggb3ZlcmZsb3cuIChcIlxuXHQrYnVmZmVyLmdldExlbmd0aEluQml0cygpXG5cdCtcIj5cIlxuXHQrdG90YWxEYXRhQ291bnQqOFxuXHQrXCIpXCIpO31cblx0aWYoYnVmZmVyLmdldExlbmd0aEluQml0cygpKzQ8PXRvdGFsRGF0YUNvdW50Kjgpe2J1ZmZlci5wdXQoMCw0KTt9XG5cdHdoaWxlKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSU4IT0wKXtidWZmZXIucHV0Qml0KGZhbHNlKTt9XG5cdHdoaWxlKHRydWUpe2lmKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKT49dG90YWxEYXRhQ291bnQqOCl7YnJlYWs7fVxuXHRidWZmZXIucHV0KFFSQ29kZU1vZGVsLlBBRDAsOCk7aWYoYnVmZmVyLmdldExlbmd0aEluQml0cygpPj10b3RhbERhdGFDb3VudCo4KXticmVhazt9XG5cdGJ1ZmZlci5wdXQoUVJDb2RlTW9kZWwuUEFEMSw4KTt9XG5cdHJldHVybiBRUkNvZGVNb2RlbC5jcmVhdGVCeXRlcyhidWZmZXIscnNCbG9ja3MpO307UVJDb2RlTW9kZWwuY3JlYXRlQnl0ZXM9ZnVuY3Rpb24oYnVmZmVyLHJzQmxvY2tzKXt2YXIgb2Zmc2V0PTA7dmFyIG1heERjQ291bnQ9MDt2YXIgbWF4RWNDb3VudD0wO3ZhciBkY2RhdGE9bmV3IEFycmF5KHJzQmxvY2tzLmxlbmd0aCk7dmFyIGVjZGF0YT1uZXcgQXJyYXkocnNCbG9ja3MubGVuZ3RoKTtmb3IodmFyIHI9MDtyPHJzQmxvY2tzLmxlbmd0aDtyKyspe3ZhciBkY0NvdW50PXJzQmxvY2tzW3JdLmRhdGFDb3VudDt2YXIgZWNDb3VudD1yc0Jsb2Nrc1tyXS50b3RhbENvdW50LWRjQ291bnQ7bWF4RGNDb3VudD1NYXRoLm1heChtYXhEY0NvdW50LGRjQ291bnQpO21heEVjQ291bnQ9TWF0aC5tYXgobWF4RWNDb3VudCxlY0NvdW50KTtkY2RhdGFbcl09bmV3IEFycmF5KGRjQ291bnQpO2Zvcih2YXIgaT0wO2k8ZGNkYXRhW3JdLmxlbmd0aDtpKyspe2RjZGF0YVtyXVtpXT0weGZmJmJ1ZmZlci5idWZmZXJbaStvZmZzZXRdO31cblx0b2Zmc2V0Kz1kY0NvdW50O3ZhciByc1BvbHk9UVJVdGlsLmdldEVycm9yQ29ycmVjdFBvbHlub21pYWwoZWNDb3VudCk7dmFyIHJhd1BvbHk9bmV3IFFSUG9seW5vbWlhbChkY2RhdGFbcl0scnNQb2x5LmdldExlbmd0aCgpLTEpO3ZhciBtb2RQb2x5PXJhd1BvbHkubW9kKHJzUG9seSk7ZWNkYXRhW3JdPW5ldyBBcnJheShyc1BvbHkuZ2V0TGVuZ3RoKCktMSk7Zm9yKHZhciBpPTA7aTxlY2RhdGFbcl0ubGVuZ3RoO2krKyl7dmFyIG1vZEluZGV4PWkrbW9kUG9seS5nZXRMZW5ndGgoKS1lY2RhdGFbcl0ubGVuZ3RoO2VjZGF0YVtyXVtpXT0obW9kSW5kZXg+PTApP21vZFBvbHkuZ2V0KG1vZEluZGV4KTowO319XG5cdHZhciB0b3RhbENvZGVDb3VudD0wO2Zvcih2YXIgaT0wO2k8cnNCbG9ja3MubGVuZ3RoO2krKyl7dG90YWxDb2RlQ291bnQrPXJzQmxvY2tzW2ldLnRvdGFsQ291bnQ7fVxuXHR2YXIgZGF0YT1uZXcgQXJyYXkodG90YWxDb2RlQ291bnQpO3ZhciBpbmRleD0wO2Zvcih2YXIgaT0wO2k8bWF4RGNDb3VudDtpKyspe2Zvcih2YXIgcj0wO3I8cnNCbG9ja3MubGVuZ3RoO3IrKyl7aWYoaTxkY2RhdGFbcl0ubGVuZ3RoKXtkYXRhW2luZGV4KytdPWRjZGF0YVtyXVtpXTt9fX1cblx0Zm9yKHZhciBpPTA7aTxtYXhFY0NvdW50O2krKyl7Zm9yKHZhciByPTA7cjxyc0Jsb2Nrcy5sZW5ndGg7cisrKXtpZihpPGVjZGF0YVtyXS5sZW5ndGgpe2RhdGFbaW5kZXgrK109ZWNkYXRhW3JdW2ldO319fVxuXHRyZXR1cm4gZGF0YTt9O3ZhciBRUk1vZGU9e01PREVfTlVNQkVSOjE8PDAsTU9ERV9BTFBIQV9OVU06MTw8MSxNT0RFXzhCSVRfQllURToxPDwyLE1PREVfS0FOSkk6MTw8M307dmFyIFFSRXJyb3JDb3JyZWN0TGV2ZWw9e0w6MSxNOjAsUTozLEg6Mn07dmFyIFFSTWFza1BhdHRlcm49e1BBVFRFUk4wMDA6MCxQQVRURVJOMDAxOjEsUEFUVEVSTjAxMDoyLFBBVFRFUk4wMTE6MyxQQVRURVJOMTAwOjQsUEFUVEVSTjEwMTo1LFBBVFRFUk4xMTA6NixQQVRURVJOMTExOjd9O3ZhciBRUlV0aWw9e1BBVFRFUk5fUE9TSVRJT05fVEFCTEU6W1tdLFs2LDE4XSxbNiwyMl0sWzYsMjZdLFs2LDMwXSxbNiwzNF0sWzYsMjIsMzhdLFs2LDI0LDQyXSxbNiwyNiw0Nl0sWzYsMjgsNTBdLFs2LDMwLDU0XSxbNiwzMiw1OF0sWzYsMzQsNjJdLFs2LDI2LDQ2LDY2XSxbNiwyNiw0OCw3MF0sWzYsMjYsNTAsNzRdLFs2LDMwLDU0LDc4XSxbNiwzMCw1Niw4Ml0sWzYsMzAsNTgsODZdLFs2LDM0LDYyLDkwXSxbNiwyOCw1MCw3Miw5NF0sWzYsMjYsNTAsNzQsOThdLFs2LDMwLDU0LDc4LDEwMl0sWzYsMjgsNTQsODAsMTA2XSxbNiwzMiw1OCw4NCwxMTBdLFs2LDMwLDU4LDg2LDExNF0sWzYsMzQsNjIsOTAsMTE4XSxbNiwyNiw1MCw3NCw5OCwxMjJdLFs2LDMwLDU0LDc4LDEwMiwxMjZdLFs2LDI2LDUyLDc4LDEwNCwxMzBdLFs2LDMwLDU2LDgyLDEwOCwxMzRdLFs2LDM0LDYwLDg2LDExMiwxMzhdLFs2LDMwLDU4LDg2LDExNCwxNDJdLFs2LDM0LDYyLDkwLDExOCwxNDZdLFs2LDMwLDU0LDc4LDEwMiwxMjYsMTUwXSxbNiwyNCw1MCw3NiwxMDIsMTI4LDE1NF0sWzYsMjgsNTQsODAsMTA2LDEzMiwxNThdLFs2LDMyLDU4LDg0LDExMCwxMzYsMTYyXSxbNiwyNiw1NCw4MiwxMTAsMTM4LDE2Nl0sWzYsMzAsNTgsODYsMTE0LDE0MiwxNzBdXSxHMTU6KDE8PDEwKXwoMTw8OCl8KDE8PDUpfCgxPDw0KXwoMTw8Mil8KDE8PDEpfCgxPDwwKSxHMTg6KDE8PDEyKXwoMTw8MTEpfCgxPDwxMCl8KDE8PDkpfCgxPDw4KXwoMTw8NSl8KDE8PDIpfCgxPDwwKSxHMTVfTUFTSzooMTw8MTQpfCgxPDwxMil8KDE8PDEwKXwoMTw8NCl8KDE8PDEpLGdldEJDSFR5cGVJbmZvOmZ1bmN0aW9uKGRhdGEpe3ZhciBkPWRhdGE8PDEwO3doaWxlKFFSVXRpbC5nZXRCQ0hEaWdpdChkKS1RUlV0aWwuZ2V0QkNIRGlnaXQoUVJVdGlsLkcxNSk+PTApe2RePShRUlV0aWwuRzE1PDwoUVJVdGlsLmdldEJDSERpZ2l0KGQpLVFSVXRpbC5nZXRCQ0hEaWdpdChRUlV0aWwuRzE1KSkpO31cblx0cmV0dXJuKChkYXRhPDwxMCl8ZCleUVJVdGlsLkcxNV9NQVNLO30sZ2V0QkNIVHlwZU51bWJlcjpmdW5jdGlvbihkYXRhKXt2YXIgZD1kYXRhPDwxMjt3aGlsZShRUlV0aWwuZ2V0QkNIRGlnaXQoZCktUVJVdGlsLmdldEJDSERpZ2l0KFFSVXRpbC5HMTgpPj0wKXtkXj0oUVJVdGlsLkcxODw8KFFSVXRpbC5nZXRCQ0hEaWdpdChkKS1RUlV0aWwuZ2V0QkNIRGlnaXQoUVJVdGlsLkcxOCkpKTt9XG5cdHJldHVybihkYXRhPDwxMil8ZDt9LGdldEJDSERpZ2l0OmZ1bmN0aW9uKGRhdGEpe3ZhciBkaWdpdD0wO3doaWxlKGRhdGEhPTApe2RpZ2l0Kys7ZGF0YT4+Pj0xO31cblx0cmV0dXJuIGRpZ2l0O30sZ2V0UGF0dGVyblBvc2l0aW9uOmZ1bmN0aW9uKHR5cGVOdW1iZXIpe3JldHVybiBRUlV0aWwuUEFUVEVSTl9QT1NJVElPTl9UQUJMRVt0eXBlTnVtYmVyLTFdO30sZ2V0TWFzazpmdW5jdGlvbihtYXNrUGF0dGVybixpLGope3N3aXRjaChtYXNrUGF0dGVybil7Y2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4wMDA6cmV0dXJuKGkraiklMj09MDtjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjAwMTpyZXR1cm4gaSUyPT0wO2Nhc2UgUVJNYXNrUGF0dGVybi5QQVRURVJOMDEwOnJldHVybiBqJTM9PTA7Y2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4wMTE6cmV0dXJuKGkraiklMz09MDtjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjEwMDpyZXR1cm4oTWF0aC5mbG9vcihpLzIpK01hdGguZmxvb3Ioai8zKSklMj09MDtjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjEwMTpyZXR1cm4oaSpqKSUyKyhpKmopJTM9PTA7Y2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4xMTA6cmV0dXJuKChpKmopJTIrKGkqaiklMyklMj09MDtjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjExMTpyZXR1cm4oKGkqaiklMysoaStqKSUyKSUyPT0wO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiYmFkIG1hc2tQYXR0ZXJuOlwiK21hc2tQYXR0ZXJuKTt9fSxnZXRFcnJvckNvcnJlY3RQb2x5bm9taWFsOmZ1bmN0aW9uKGVycm9yQ29ycmVjdExlbmd0aCl7dmFyIGE9bmV3IFFSUG9seW5vbWlhbChbMV0sMCk7Zm9yKHZhciBpPTA7aTxlcnJvckNvcnJlY3RMZW5ndGg7aSsrKXthPWEubXVsdGlwbHkobmV3IFFSUG9seW5vbWlhbChbMSxRUk1hdGguZ2V4cChpKV0sMCkpO31cblx0cmV0dXJuIGE7fSxnZXRMZW5ndGhJbkJpdHM6ZnVuY3Rpb24obW9kZSx0eXBlKXtpZigxPD10eXBlJiZ0eXBlPDEwKXtzd2l0Y2gobW9kZSl7Y2FzZSBRUk1vZGUuTU9ERV9OVU1CRVI6cmV0dXJuIDEwO2Nhc2UgUVJNb2RlLk1PREVfQUxQSEFfTlVNOnJldHVybiA5O2Nhc2UgUVJNb2RlLk1PREVfOEJJVF9CWVRFOnJldHVybiA4O2Nhc2UgUVJNb2RlLk1PREVfS0FOSkk6cmV0dXJuIDg7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJtb2RlOlwiK21vZGUpO319ZWxzZSBpZih0eXBlPDI3KXtzd2l0Y2gobW9kZSl7Y2FzZSBRUk1vZGUuTU9ERV9OVU1CRVI6cmV0dXJuIDEyO2Nhc2UgUVJNb2RlLk1PREVfQUxQSEFfTlVNOnJldHVybiAxMTtjYXNlIFFSTW9kZS5NT0RFXzhCSVRfQllURTpyZXR1cm4gMTY7Y2FzZSBRUk1vZGUuTU9ERV9LQU5KSTpyZXR1cm4gMTA7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJtb2RlOlwiK21vZGUpO319ZWxzZSBpZih0eXBlPDQxKXtzd2l0Y2gobW9kZSl7Y2FzZSBRUk1vZGUuTU9ERV9OVU1CRVI6cmV0dXJuIDE0O2Nhc2UgUVJNb2RlLk1PREVfQUxQSEFfTlVNOnJldHVybiAxMztjYXNlIFFSTW9kZS5NT0RFXzhCSVRfQllURTpyZXR1cm4gMTY7Y2FzZSBRUk1vZGUuTU9ERV9LQU5KSTpyZXR1cm4gMTI7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJtb2RlOlwiK21vZGUpO319ZWxzZXt0aHJvdyBuZXcgRXJyb3IoXCJ0eXBlOlwiK3R5cGUpO319LGdldExvc3RQb2ludDpmdW5jdGlvbihxckNvZGUpe3ZhciBtb2R1bGVDb3VudD1xckNvZGUuZ2V0TW9kdWxlQ291bnQoKTt2YXIgbG9zdFBvaW50PTA7Zm9yKHZhciByb3c9MDtyb3c8bW9kdWxlQ291bnQ7cm93Kyspe2Zvcih2YXIgY29sPTA7Y29sPG1vZHVsZUNvdW50O2NvbCsrKXt2YXIgc2FtZUNvdW50PTA7dmFyIGRhcms9cXJDb2RlLmlzRGFyayhyb3csY29sKTtmb3IodmFyIHI9LTE7cjw9MTtyKyspe2lmKHJvdytyPDB8fG1vZHVsZUNvdW50PD1yb3crcil7Y29udGludWU7fVxuXHRmb3IodmFyIGM9LTE7Yzw9MTtjKyspe2lmKGNvbCtjPDB8fG1vZHVsZUNvdW50PD1jb2wrYyl7Y29udGludWU7fVxuXHRpZihyPT0wJiZjPT0wKXtjb250aW51ZTt9XG5cdGlmKGRhcms9PXFyQ29kZS5pc0Rhcmsocm93K3IsY29sK2MpKXtzYW1lQ291bnQrKzt9fX1cblx0aWYoc2FtZUNvdW50PjUpe2xvc3RQb2ludCs9KDMrc2FtZUNvdW50LTUpO319fVxuXHRmb3IodmFyIHJvdz0wO3Jvdzxtb2R1bGVDb3VudC0xO3JvdysrKXtmb3IodmFyIGNvbD0wO2NvbDxtb2R1bGVDb3VudC0xO2NvbCsrKXt2YXIgY291bnQ9MDtpZihxckNvZGUuaXNEYXJrKHJvdyxjb2wpKWNvdW50Kys7aWYocXJDb2RlLmlzRGFyayhyb3crMSxjb2wpKWNvdW50Kys7aWYocXJDb2RlLmlzRGFyayhyb3csY29sKzEpKWNvdW50Kys7aWYocXJDb2RlLmlzRGFyayhyb3crMSxjb2wrMSkpY291bnQrKztpZihjb3VudD09MHx8Y291bnQ9PTQpe2xvc3RQb2ludCs9Mzt9fX1cblx0Zm9yKHZhciByb3c9MDtyb3c8bW9kdWxlQ291bnQ7cm93Kyspe2Zvcih2YXIgY29sPTA7Y29sPG1vZHVsZUNvdW50LTY7Y29sKyspe2lmKHFyQ29kZS5pc0Rhcmsocm93LGNvbCkmJiFxckNvZGUuaXNEYXJrKHJvdyxjb2wrMSkmJnFyQ29kZS5pc0Rhcmsocm93LGNvbCsyKSYmcXJDb2RlLmlzRGFyayhyb3csY29sKzMpJiZxckNvZGUuaXNEYXJrKHJvdyxjb2wrNCkmJiFxckNvZGUuaXNEYXJrKHJvdyxjb2wrNSkmJnFyQ29kZS5pc0Rhcmsocm93LGNvbCs2KSl7bG9zdFBvaW50Kz00MDt9fX1cblx0Zm9yKHZhciBjb2w9MDtjb2w8bW9kdWxlQ291bnQ7Y29sKyspe2Zvcih2YXIgcm93PTA7cm93PG1vZHVsZUNvdW50LTY7cm93Kyspe2lmKHFyQ29kZS5pc0Rhcmsocm93LGNvbCkmJiFxckNvZGUuaXNEYXJrKHJvdysxLGNvbCkmJnFyQ29kZS5pc0Rhcmsocm93KzIsY29sKSYmcXJDb2RlLmlzRGFyayhyb3crMyxjb2wpJiZxckNvZGUuaXNEYXJrKHJvdys0LGNvbCkmJiFxckNvZGUuaXNEYXJrKHJvdys1LGNvbCkmJnFyQ29kZS5pc0Rhcmsocm93KzYsY29sKSl7bG9zdFBvaW50Kz00MDt9fX1cblx0dmFyIGRhcmtDb3VudD0wO2Zvcih2YXIgY29sPTA7Y29sPG1vZHVsZUNvdW50O2NvbCsrKXtmb3IodmFyIHJvdz0wO3Jvdzxtb2R1bGVDb3VudDtyb3crKyl7aWYocXJDb2RlLmlzRGFyayhyb3csY29sKSl7ZGFya0NvdW50Kys7fX19XG5cdHZhciByYXRpbz1NYXRoLmFicygxMDAqZGFya0NvdW50L21vZHVsZUNvdW50L21vZHVsZUNvdW50LTUwKS81O2xvc3RQb2ludCs9cmF0aW8qMTA7cmV0dXJuIGxvc3RQb2ludDt9fTt2YXIgUVJNYXRoPXtnbG9nOmZ1bmN0aW9uKG4pe2lmKG48MSl7dGhyb3cgbmV3IEVycm9yKFwiZ2xvZyhcIituK1wiKVwiKTt9XG5cdHJldHVybiBRUk1hdGguTE9HX1RBQkxFW25dO30sZ2V4cDpmdW5jdGlvbihuKXt3aGlsZShuPDApe24rPTI1NTt9XG5cdHdoaWxlKG4+PTI1Nil7bi09MjU1O31cblx0cmV0dXJuIFFSTWF0aC5FWFBfVEFCTEVbbl07fSxFWFBfVEFCTEU6bmV3IEFycmF5KDI1NiksTE9HX1RBQkxFOm5ldyBBcnJheSgyNTYpfTtmb3IodmFyIGk9MDtpPDg7aSsrKXtRUk1hdGguRVhQX1RBQkxFW2ldPTE8PGk7fVxuXHRmb3IodmFyIGk9ODtpPDI1NjtpKyspe1FSTWF0aC5FWFBfVEFCTEVbaV09UVJNYXRoLkVYUF9UQUJMRVtpLTRdXlFSTWF0aC5FWFBfVEFCTEVbaS01XV5RUk1hdGguRVhQX1RBQkxFW2ktNl1eUVJNYXRoLkVYUF9UQUJMRVtpLThdO31cblx0Zm9yKHZhciBpPTA7aTwyNTU7aSsrKXtRUk1hdGguTE9HX1RBQkxFW1FSTWF0aC5FWFBfVEFCTEVbaV1dPWk7fVxuXHRmdW5jdGlvbiBRUlBvbHlub21pYWwobnVtLHNoaWZ0KXtpZihudW0ubGVuZ3RoPT11bmRlZmluZWQpe3Rocm93IG5ldyBFcnJvcihudW0ubGVuZ3RoK1wiL1wiK3NoaWZ0KTt9XG5cdHZhciBvZmZzZXQ9MDt3aGlsZShvZmZzZXQ8bnVtLmxlbmd0aCYmbnVtW29mZnNldF09PTApe29mZnNldCsrO31cblx0dGhpcy5udW09bmV3IEFycmF5KG51bS5sZW5ndGgtb2Zmc2V0K3NoaWZ0KTtmb3IodmFyIGk9MDtpPG51bS5sZW5ndGgtb2Zmc2V0O2krKyl7dGhpcy5udW1baV09bnVtW2krb2Zmc2V0XTt9fVxuXHRRUlBvbHlub21pYWwucHJvdG90eXBlPXtnZXQ6ZnVuY3Rpb24oaW5kZXgpe3JldHVybiB0aGlzLm51bVtpbmRleF07fSxnZXRMZW5ndGg6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5udW0ubGVuZ3RoO30sbXVsdGlwbHk6ZnVuY3Rpb24oZSl7dmFyIG51bT1uZXcgQXJyYXkodGhpcy5nZXRMZW5ndGgoKStlLmdldExlbmd0aCgpLTEpO2Zvcih2YXIgaT0wO2k8dGhpcy5nZXRMZW5ndGgoKTtpKyspe2Zvcih2YXIgaj0wO2o8ZS5nZXRMZW5ndGgoKTtqKyspe251bVtpK2pdXj1RUk1hdGguZ2V4cChRUk1hdGguZ2xvZyh0aGlzLmdldChpKSkrUVJNYXRoLmdsb2coZS5nZXQoaikpKTt9fVxuXHRyZXR1cm4gbmV3IFFSUG9seW5vbWlhbChudW0sMCk7fSxtb2Q6ZnVuY3Rpb24oZSl7aWYodGhpcy5nZXRMZW5ndGgoKS1lLmdldExlbmd0aCgpPDApe3JldHVybiB0aGlzO31cblx0dmFyIHJhdGlvPVFSTWF0aC5nbG9nKHRoaXMuZ2V0KDApKS1RUk1hdGguZ2xvZyhlLmdldCgwKSk7dmFyIG51bT1uZXcgQXJyYXkodGhpcy5nZXRMZW5ndGgoKSk7Zm9yKHZhciBpPTA7aTx0aGlzLmdldExlbmd0aCgpO2krKyl7bnVtW2ldPXRoaXMuZ2V0KGkpO31cblx0Zm9yKHZhciBpPTA7aTxlLmdldExlbmd0aCgpO2krKyl7bnVtW2ldXj1RUk1hdGguZ2V4cChRUk1hdGguZ2xvZyhlLmdldChpKSkrcmF0aW8pO31cblx0cmV0dXJuIG5ldyBRUlBvbHlub21pYWwobnVtLDApLm1vZChlKTt9fTtmdW5jdGlvbiBRUlJTQmxvY2sodG90YWxDb3VudCxkYXRhQ291bnQpe3RoaXMudG90YWxDb3VudD10b3RhbENvdW50O3RoaXMuZGF0YUNvdW50PWRhdGFDb3VudDt9XG5cdFFSUlNCbG9jay5SU19CTE9DS19UQUJMRT1bWzEsMjYsMTldLFsxLDI2LDE2XSxbMSwyNiwxM10sWzEsMjYsOV0sWzEsNDQsMzRdLFsxLDQ0LDI4XSxbMSw0NCwyMl0sWzEsNDQsMTZdLFsxLDcwLDU1XSxbMSw3MCw0NF0sWzIsMzUsMTddLFsyLDM1LDEzXSxbMSwxMDAsODBdLFsyLDUwLDMyXSxbMiw1MCwyNF0sWzQsMjUsOV0sWzEsMTM0LDEwOF0sWzIsNjcsNDNdLFsyLDMzLDE1LDIsMzQsMTZdLFsyLDMzLDExLDIsMzQsMTJdLFsyLDg2LDY4XSxbNCw0MywyN10sWzQsNDMsMTldLFs0LDQzLDE1XSxbMiw5OCw3OF0sWzQsNDksMzFdLFsyLDMyLDE0LDQsMzMsMTVdLFs0LDM5LDEzLDEsNDAsMTRdLFsyLDEyMSw5N10sWzIsNjAsMzgsMiw2MSwzOV0sWzQsNDAsMTgsMiw0MSwxOV0sWzQsNDAsMTQsMiw0MSwxNV0sWzIsMTQ2LDExNl0sWzMsNTgsMzYsMiw1OSwzN10sWzQsMzYsMTYsNCwzNywxN10sWzQsMzYsMTIsNCwzNywxM10sWzIsODYsNjgsMiw4Nyw2OV0sWzQsNjksNDMsMSw3MCw0NF0sWzYsNDMsMTksMiw0NCwyMF0sWzYsNDMsMTUsMiw0NCwxNl0sWzQsMTAxLDgxXSxbMSw4MCw1MCw0LDgxLDUxXSxbNCw1MCwyMiw0LDUxLDIzXSxbMywzNiwxMiw4LDM3LDEzXSxbMiwxMTYsOTIsMiwxMTcsOTNdLFs2LDU4LDM2LDIsNTksMzddLFs0LDQ2LDIwLDYsNDcsMjFdLFs3LDQyLDE0LDQsNDMsMTVdLFs0LDEzMywxMDddLFs4LDU5LDM3LDEsNjAsMzhdLFs4LDQ0LDIwLDQsNDUsMjFdLFsxMiwzMywxMSw0LDM0LDEyXSxbMywxNDUsMTE1LDEsMTQ2LDExNl0sWzQsNjQsNDAsNSw2NSw0MV0sWzExLDM2LDE2LDUsMzcsMTddLFsxMSwzNiwxMiw1LDM3LDEzXSxbNSwxMDksODcsMSwxMTAsODhdLFs1LDY1LDQxLDUsNjYsNDJdLFs1LDU0LDI0LDcsNTUsMjVdLFsxMSwzNiwxMl0sWzUsMTIyLDk4LDEsMTIzLDk5XSxbNyw3Myw0NSwzLDc0LDQ2XSxbMTUsNDMsMTksMiw0NCwyMF0sWzMsNDUsMTUsMTMsNDYsMTZdLFsxLDEzNSwxMDcsNSwxMzYsMTA4XSxbMTAsNzQsNDYsMSw3NSw0N10sWzEsNTAsMjIsMTUsNTEsMjNdLFsyLDQyLDE0LDE3LDQzLDE1XSxbNSwxNTAsMTIwLDEsMTUxLDEyMV0sWzksNjksNDMsNCw3MCw0NF0sWzE3LDUwLDIyLDEsNTEsMjNdLFsyLDQyLDE0LDE5LDQzLDE1XSxbMywxNDEsMTEzLDQsMTQyLDExNF0sWzMsNzAsNDQsMTEsNzEsNDVdLFsxNyw0NywyMSw0LDQ4LDIyXSxbOSwzOSwxMywxNiw0MCwxNF0sWzMsMTM1LDEwNyw1LDEzNiwxMDhdLFszLDY3LDQxLDEzLDY4LDQyXSxbMTUsNTQsMjQsNSw1NSwyNV0sWzE1LDQzLDE1LDEwLDQ0LDE2XSxbNCwxNDQsMTE2LDQsMTQ1LDExN10sWzE3LDY4LDQyXSxbMTcsNTAsMjIsNiw1MSwyM10sWzE5LDQ2LDE2LDYsNDcsMTddLFsyLDEzOSwxMTEsNywxNDAsMTEyXSxbMTcsNzQsNDZdLFs3LDU0LDI0LDE2LDU1LDI1XSxbMzQsMzcsMTNdLFs0LDE1MSwxMjEsNSwxNTIsMTIyXSxbNCw3NSw0NywxNCw3Niw0OF0sWzExLDU0LDI0LDE0LDU1LDI1XSxbMTYsNDUsMTUsMTQsNDYsMTZdLFs2LDE0NywxMTcsNCwxNDgsMTE4XSxbNiw3Myw0NSwxNCw3NCw0Nl0sWzExLDU0LDI0LDE2LDU1LDI1XSxbMzAsNDYsMTYsMiw0NywxN10sWzgsMTMyLDEwNiw0LDEzMywxMDddLFs4LDc1LDQ3LDEzLDc2LDQ4XSxbNyw1NCwyNCwyMiw1NSwyNV0sWzIyLDQ1LDE1LDEzLDQ2LDE2XSxbMTAsMTQyLDExNCwyLDE0MywxMTVdLFsxOSw3NCw0Niw0LDc1LDQ3XSxbMjgsNTAsMjIsNiw1MSwyM10sWzMzLDQ2LDE2LDQsNDcsMTddLFs4LDE1MiwxMjIsNCwxNTMsMTIzXSxbMjIsNzMsNDUsMyw3NCw0Nl0sWzgsNTMsMjMsMjYsNTQsMjRdLFsxMiw0NSwxNSwyOCw0NiwxNl0sWzMsMTQ3LDExNywxMCwxNDgsMTE4XSxbMyw3Myw0NSwyMyw3NCw0Nl0sWzQsNTQsMjQsMzEsNTUsMjVdLFsxMSw0NSwxNSwzMSw0NiwxNl0sWzcsMTQ2LDExNiw3LDE0NywxMTddLFsyMSw3Myw0NSw3LDc0LDQ2XSxbMSw1MywyMywzNyw1NCwyNF0sWzE5LDQ1LDE1LDI2LDQ2LDE2XSxbNSwxNDUsMTE1LDEwLDE0NiwxMTZdLFsxOSw3NSw0NywxMCw3Niw0OF0sWzE1LDU0LDI0LDI1LDU1LDI1XSxbMjMsNDUsMTUsMjUsNDYsMTZdLFsxMywxNDUsMTE1LDMsMTQ2LDExNl0sWzIsNzQsNDYsMjksNzUsNDddLFs0Miw1NCwyNCwxLDU1LDI1XSxbMjMsNDUsMTUsMjgsNDYsMTZdLFsxNywxNDUsMTE1XSxbMTAsNzQsNDYsMjMsNzUsNDddLFsxMCw1NCwyNCwzNSw1NSwyNV0sWzE5LDQ1LDE1LDM1LDQ2LDE2XSxbMTcsMTQ1LDExNSwxLDE0NiwxMTZdLFsxNCw3NCw0NiwyMSw3NSw0N10sWzI5LDU0LDI0LDE5LDU1LDI1XSxbMTEsNDUsMTUsNDYsNDYsMTZdLFsxMywxNDUsMTE1LDYsMTQ2LDExNl0sWzE0LDc0LDQ2LDIzLDc1LDQ3XSxbNDQsNTQsMjQsNyw1NSwyNV0sWzU5LDQ2LDE2LDEsNDcsMTddLFsxMiwxNTEsMTIxLDcsMTUyLDEyMl0sWzEyLDc1LDQ3LDI2LDc2LDQ4XSxbMzksNTQsMjQsMTQsNTUsMjVdLFsyMiw0NSwxNSw0MSw0NiwxNl0sWzYsMTUxLDEyMSwxNCwxNTIsMTIyXSxbNiw3NSw0NywzNCw3Niw0OF0sWzQ2LDU0LDI0LDEwLDU1LDI1XSxbMiw0NSwxNSw2NCw0NiwxNl0sWzE3LDE1MiwxMjIsNCwxNTMsMTIzXSxbMjksNzQsNDYsMTQsNzUsNDddLFs0OSw1NCwyNCwxMCw1NSwyNV0sWzI0LDQ1LDE1LDQ2LDQ2LDE2XSxbNCwxNTIsMTIyLDE4LDE1MywxMjNdLFsxMyw3NCw0NiwzMiw3NSw0N10sWzQ4LDU0LDI0LDE0LDU1LDI1XSxbNDIsNDUsMTUsMzIsNDYsMTZdLFsyMCwxNDcsMTE3LDQsMTQ4LDExOF0sWzQwLDc1LDQ3LDcsNzYsNDhdLFs0Myw1NCwyNCwyMiw1NSwyNV0sWzEwLDQ1LDE1LDY3LDQ2LDE2XSxbMTksMTQ4LDExOCw2LDE0OSwxMTldLFsxOCw3NSw0NywzMSw3Niw0OF0sWzM0LDU0LDI0LDM0LDU1LDI1XSxbMjAsNDUsMTUsNjEsNDYsMTZdXTtRUlJTQmxvY2suZ2V0UlNCbG9ja3M9ZnVuY3Rpb24odHlwZU51bWJlcixlcnJvckNvcnJlY3RMZXZlbCl7dmFyIHJzQmxvY2s9UVJSU0Jsb2NrLmdldFJzQmxvY2tUYWJsZSh0eXBlTnVtYmVyLGVycm9yQ29ycmVjdExldmVsKTtpZihyc0Jsb2NrPT11bmRlZmluZWQpe3Rocm93IG5ldyBFcnJvcihcImJhZCBycyBibG9jayBAIHR5cGVOdW1iZXI6XCIrdHlwZU51bWJlcitcIi9lcnJvckNvcnJlY3RMZXZlbDpcIitlcnJvckNvcnJlY3RMZXZlbCk7fVxuXHR2YXIgbGVuZ3RoPXJzQmxvY2subGVuZ3RoLzM7dmFyIGxpc3Q9W107Zm9yKHZhciBpPTA7aTxsZW5ndGg7aSsrKXt2YXIgY291bnQ9cnNCbG9ja1tpKjMrMF07dmFyIHRvdGFsQ291bnQ9cnNCbG9ja1tpKjMrMV07dmFyIGRhdGFDb3VudD1yc0Jsb2NrW2kqMysyXTtmb3IodmFyIGo9MDtqPGNvdW50O2orKyl7bGlzdC5wdXNoKG5ldyBRUlJTQmxvY2sodG90YWxDb3VudCxkYXRhQ291bnQpKTt9fVxuXHRyZXR1cm4gbGlzdDt9O1FSUlNCbG9jay5nZXRSc0Jsb2NrVGFibGU9ZnVuY3Rpb24odHlwZU51bWJlcixlcnJvckNvcnJlY3RMZXZlbCl7c3dpdGNoKGVycm9yQ29ycmVjdExldmVsKXtjYXNlIFFSRXJyb3JDb3JyZWN0TGV2ZWwuTDpyZXR1cm4gUVJSU0Jsb2NrLlJTX0JMT0NLX1RBQkxFWyh0eXBlTnVtYmVyLTEpKjQrMF07Y2FzZSBRUkVycm9yQ29ycmVjdExldmVsLk06cmV0dXJuIFFSUlNCbG9jay5SU19CTE9DS19UQUJMRVsodHlwZU51bWJlci0xKSo0KzFdO2Nhc2UgUVJFcnJvckNvcnJlY3RMZXZlbC5ROnJldHVybiBRUlJTQmxvY2suUlNfQkxPQ0tfVEFCTEVbKHR5cGVOdW1iZXItMSkqNCsyXTtjYXNlIFFSRXJyb3JDb3JyZWN0TGV2ZWwuSDpyZXR1cm4gUVJSU0Jsb2NrLlJTX0JMT0NLX1RBQkxFWyh0eXBlTnVtYmVyLTEpKjQrM107ZGVmYXVsdDpyZXR1cm4gdW5kZWZpbmVkO319O2Z1bmN0aW9uIFFSQml0QnVmZmVyKCl7dGhpcy5idWZmZXI9W107dGhpcy5sZW5ndGg9MDt9XG5cdFFSQml0QnVmZmVyLnByb3RvdHlwZT17Z2V0OmZ1bmN0aW9uKGluZGV4KXt2YXIgYnVmSW5kZXg9TWF0aC5mbG9vcihpbmRleC84KTtyZXR1cm4oKHRoaXMuYnVmZmVyW2J1ZkluZGV4XT4+Pig3LWluZGV4JTgpKSYxKT09MTt9LHB1dDpmdW5jdGlvbihudW0sbGVuZ3RoKXtmb3IodmFyIGk9MDtpPGxlbmd0aDtpKyspe3RoaXMucHV0Qml0KCgobnVtPj4+KGxlbmd0aC1pLTEpKSYxKT09MSk7fX0sZ2V0TGVuZ3RoSW5CaXRzOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubGVuZ3RoO30scHV0Qml0OmZ1bmN0aW9uKGJpdCl7dmFyIGJ1ZkluZGV4PU1hdGguZmxvb3IodGhpcy5sZW5ndGgvOCk7aWYodGhpcy5idWZmZXIubGVuZ3RoPD1idWZJbmRleCl7dGhpcy5idWZmZXIucHVzaCgwKTt9XG5cdGlmKGJpdCl7dGhpcy5idWZmZXJbYnVmSW5kZXhdfD0oMHg4MD4+Pih0aGlzLmxlbmd0aCU4KSk7fVxuXHR0aGlzLmxlbmd0aCsrO319O3ZhciBRUkNvZGVMaW1pdExlbmd0aD1bWzE3LDE0LDExLDddLFszMiwyNiwyMCwxNF0sWzUzLDQyLDMyLDI0XSxbNzgsNjIsNDYsMzRdLFsxMDYsODQsNjAsNDRdLFsxMzQsMTA2LDc0LDU4XSxbMTU0LDEyMiw4Niw2NF0sWzE5MiwxNTIsMTA4LDg0XSxbMjMwLDE4MCwxMzAsOThdLFsyNzEsMjEzLDE1MSwxMTldLFszMjEsMjUxLDE3NywxMzddLFszNjcsMjg3LDIwMywxNTVdLFs0MjUsMzMxLDI0MSwxNzddLFs0NTgsMzYyLDI1OCwxOTRdLFs1MjAsNDEyLDI5MiwyMjBdLFs1ODYsNDUwLDMyMiwyNTBdLFs2NDQsNTA0LDM2NCwyODBdLFs3MTgsNTYwLDM5NCwzMTBdLFs3OTIsNjI0LDQ0MiwzMzhdLFs4NTgsNjY2LDQ4MiwzODJdLFs5MjksNzExLDUwOSw0MDNdLFsxMDAzLDc3OSw1NjUsNDM5XSxbMTA5MSw4NTcsNjExLDQ2MV0sWzExNzEsOTExLDY2MSw1MTFdLFsxMjczLDk5Nyw3MTUsNTM1XSxbMTM2NywxMDU5LDc1MSw1OTNdLFsxNDY1LDExMjUsODA1LDYyNV0sWzE1MjgsMTE5MCw4NjgsNjU4XSxbMTYyOCwxMjY0LDkwOCw2OThdLFsxNzMyLDEzNzAsOTgyLDc0Ml0sWzE4NDAsMTQ1MiwxMDMwLDc5MF0sWzE5NTIsMTUzOCwxMTEyLDg0Ml0sWzIwNjgsMTYyOCwxMTY4LDg5OF0sWzIxODgsMTcyMiwxMjI4LDk1OF0sWzIzMDMsMTgwOSwxMjgzLDk4M10sWzI0MzEsMTkxMSwxMzUxLDEwNTFdLFsyNTYzLDE5ODksMTQyMywxMDkzXSxbMjY5OSwyMDk5LDE0OTksMTEzOV0sWzI4MDksMjIxMywxNTc5LDEyMTldLFsyOTUzLDIzMzEsMTY2MywxMjczXV07XG5cdFxuXHRmdW5jdGlvbiBfaXNTdXBwb3J0Q2FudmFzKCkge1xuXHRcdHJldHVybiB0eXBlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEICE9IFwidW5kZWZpbmVkXCI7XG5cdH1cblx0XG5cdC8vIGFuZHJvaWQgMi54IGRvZXNuJ3Qgc3VwcG9ydCBEYXRhLVVSSSBzcGVjXG5cdGZ1bmN0aW9uIF9nZXRBbmRyb2lkKCkge1xuXHRcdHZhciBhbmRyb2lkID0gZmFsc2U7XG5cdFx0dmFyIHNBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cdFx0XG5cdFx0aWYgKC9hbmRyb2lkL2kudGVzdChzQWdlbnQpKSB7IC8vIGFuZHJvaWRcblx0XHRcdGFuZHJvaWQgPSB0cnVlO1xuXHRcdFx0dmFyIGFNYXQgPSBzQWdlbnQudG9TdHJpbmcoKS5tYXRjaCgvYW5kcm9pZCAoWzAtOV1cXC5bMC05XSkvaSk7XG5cdFx0XHRcblx0XHRcdGlmIChhTWF0ICYmIGFNYXRbMV0pIHtcblx0XHRcdFx0YW5kcm9pZCA9IHBhcnNlRmxvYXQoYU1hdFsxXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBhbmRyb2lkO1xuXHR9XG5cdFxuXHR2YXIgc3ZnRHJhd2VyID0gKGZ1bmN0aW9uKCkge1xuXG5cdFx0dmFyIERyYXdpbmcgPSBmdW5jdGlvbiAoZWwsIGh0T3B0aW9uKSB7XG5cdFx0XHR0aGlzLl9lbCA9IGVsO1xuXHRcdFx0dGhpcy5faHRPcHRpb24gPSBodE9wdGlvbjtcblx0XHR9O1xuXG5cdFx0RHJhd2luZy5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChvUVJDb2RlKSB7XG5cdFx0XHR2YXIgX2h0T3B0aW9uID0gdGhpcy5faHRPcHRpb247XG5cdFx0XHR2YXIgX2VsID0gdGhpcy5fZWw7XG5cdFx0XHR2YXIgbkNvdW50ID0gb1FSQ29kZS5nZXRNb2R1bGVDb3VudCgpO1xuXHRcdFx0dmFyIG5XaWR0aCA9IE1hdGguZmxvb3IoX2h0T3B0aW9uLndpZHRoIC8gbkNvdW50KTtcblx0XHRcdHZhciBuSGVpZ2h0ID0gTWF0aC5mbG9vcihfaHRPcHRpb24uaGVpZ2h0IC8gbkNvdW50KTtcblxuXHRcdFx0dGhpcy5jbGVhcigpO1xuXG5cdFx0XHRmdW5jdGlvbiBtYWtlU1ZHKHRhZywgYXR0cnMpIHtcblx0XHRcdFx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIHRhZyk7XG5cdFx0XHRcdGZvciAodmFyIGsgaW4gYXR0cnMpXG5cdFx0XHRcdFx0aWYgKGF0dHJzLmhhc093blByb3BlcnR5KGspKSBlbC5zZXRBdHRyaWJ1dGUoaywgYXR0cnNba10pO1xuXHRcdFx0XHRyZXR1cm4gZWw7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBzdmcgPSBtYWtlU1ZHKFwic3ZnXCIgLCB7J3ZpZXdCb3gnOiAnMCAwICcgKyBTdHJpbmcobkNvdW50KSArIFwiIFwiICsgU3RyaW5nKG5Db3VudCksICd3aWR0aCc6ICcxMDAlJywgJ2hlaWdodCc6ICcxMDAlJywgJ2ZpbGwnOiBfaHRPcHRpb24uY29sb3JMaWdodH0pO1xuXHRcdFx0c3ZnLnNldEF0dHJpYnV0ZU5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy9cIiwgXCJ4bWxuczp4bGlua1wiLCBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIik7XG5cdFx0XHRfZWwuYXBwZW5kQ2hpbGQoc3ZnKTtcblxuXHRcdFx0c3ZnLmFwcGVuZENoaWxkKG1ha2VTVkcoXCJyZWN0XCIsIHtcImZpbGxcIjogX2h0T3B0aW9uLmNvbG9yTGlnaHQsIFwid2lkdGhcIjogXCIxMDAlXCIsIFwiaGVpZ2h0XCI6IFwiMTAwJVwifSkpO1xuXHRcdFx0c3ZnLmFwcGVuZENoaWxkKG1ha2VTVkcoXCJyZWN0XCIsIHtcImZpbGxcIjogX2h0T3B0aW9uLmNvbG9yRGFyaywgXCJ3aWR0aFwiOiBcIjFcIiwgXCJoZWlnaHRcIjogXCIxXCIsIFwiaWRcIjogXCJ0ZW1wbGF0ZVwifSkpO1xuXG5cdFx0XHRmb3IgKHZhciByb3cgPSAwOyByb3cgPCBuQ291bnQ7IHJvdysrKSB7XG5cdFx0XHRcdGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IG5Db3VudDsgY29sKyspIHtcblx0XHRcdFx0XHRpZiAob1FSQ29kZS5pc0Rhcmsocm93LCBjb2wpKSB7XG5cdFx0XHRcdFx0XHR2YXIgY2hpbGQgPSBtYWtlU1ZHKFwidXNlXCIsIHtcInhcIjogU3RyaW5nKHJvdyksIFwieVwiOiBTdHJpbmcoY29sKX0pO1xuXHRcdFx0XHRcdFx0Y2hpbGQuc2V0QXR0cmlidXRlTlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsIFwiaHJlZlwiLCBcIiN0ZW1wbGF0ZVwiKVxuXHRcdFx0XHRcdFx0c3ZnLmFwcGVuZENoaWxkKGNoaWxkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHRcdERyYXdpbmcucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0d2hpbGUgKHRoaXMuX2VsLmhhc0NoaWxkTm9kZXMoKSlcblx0XHRcdFx0dGhpcy5fZWwucmVtb3ZlQ2hpbGQodGhpcy5fZWwubGFzdENoaWxkKTtcblx0XHR9O1xuXHRcdHJldHVybiBEcmF3aW5nO1xuXHR9KSgpO1xuXG5cdHZhciB1c2VTVkcgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInN2Z1wiO1xuXG5cdC8vIERyYXdpbmcgaW4gRE9NIGJ5IHVzaW5nIFRhYmxlIHRhZ1xuXHR2YXIgRHJhd2luZyA9IHVzZVNWRyA/IHN2Z0RyYXdlciA6ICFfaXNTdXBwb3J0Q2FudmFzKCkgPyAoZnVuY3Rpb24gKCkge1xuXHRcdHZhciBEcmF3aW5nID0gZnVuY3Rpb24gKGVsLCBodE9wdGlvbikge1xuXHRcdFx0dGhpcy5fZWwgPSBlbDtcblx0XHRcdHRoaXMuX2h0T3B0aW9uID0gaHRPcHRpb247XG5cdFx0fTtcblx0XHRcdFxuXHRcdC8qKlxuXHRcdCAqIERyYXcgdGhlIFFSQ29kZVxuXHRcdCAqIFxuXHRcdCAqIEBwYXJhbSB7UVJDb2RlfSBvUVJDb2RlXG5cdFx0ICovXG5cdFx0RHJhd2luZy5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChvUVJDb2RlKSB7XG4gICAgICAgICAgICB2YXIgX2h0T3B0aW9uID0gdGhpcy5faHRPcHRpb247XG4gICAgICAgICAgICB2YXIgX2VsID0gdGhpcy5fZWw7XG5cdFx0XHR2YXIgbkNvdW50ID0gb1FSQ29kZS5nZXRNb2R1bGVDb3VudCgpO1xuXHRcdFx0dmFyIG5XaWR0aCA9IE1hdGguZmxvb3IoX2h0T3B0aW9uLndpZHRoIC8gbkNvdW50KTtcblx0XHRcdHZhciBuSGVpZ2h0ID0gTWF0aC5mbG9vcihfaHRPcHRpb24uaGVpZ2h0IC8gbkNvdW50KTtcblx0XHRcdHZhciBhSFRNTCA9IFsnPHRhYmxlIHN0eWxlPVwiYm9yZGVyOjA7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlO1wiPiddO1xuXHRcdFx0XG5cdFx0XHRmb3IgKHZhciByb3cgPSAwOyByb3cgPCBuQ291bnQ7IHJvdysrKSB7XG5cdFx0XHRcdGFIVE1MLnB1c2goJzx0cj4nKTtcblx0XHRcdFx0XG5cdFx0XHRcdGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IG5Db3VudDsgY29sKyspIHtcblx0XHRcdFx0XHRhSFRNTC5wdXNoKCc8dGQgc3R5bGU9XCJib3JkZXI6MDtib3JkZXItY29sbGFwc2U6Y29sbGFwc2U7cGFkZGluZzowO21hcmdpbjowO3dpZHRoOicgKyBuV2lkdGggKyAncHg7aGVpZ2h0OicgKyBuSGVpZ2h0ICsgJ3B4O2JhY2tncm91bmQtY29sb3I6JyArIChvUVJDb2RlLmlzRGFyayhyb3csIGNvbCkgPyBfaHRPcHRpb24uY29sb3JEYXJrIDogX2h0T3B0aW9uLmNvbG9yTGlnaHQpICsgJztcIj48L3RkPicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRhSFRNTC5wdXNoKCc8L3RyPicpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRhSFRNTC5wdXNoKCc8L3RhYmxlPicpO1xuXHRcdFx0X2VsLmlubmVySFRNTCA9IGFIVE1MLmpvaW4oJycpO1xuXHRcdFx0XG5cdFx0XHQvLyBGaXggdGhlIG1hcmdpbiB2YWx1ZXMgYXMgcmVhbCBzaXplLlxuXHRcdFx0dmFyIGVsVGFibGUgPSBfZWwuY2hpbGROb2Rlc1swXTtcblx0XHRcdHZhciBuTGVmdE1hcmdpblRhYmxlID0gKF9odE9wdGlvbi53aWR0aCAtIGVsVGFibGUub2Zmc2V0V2lkdGgpIC8gMjtcblx0XHRcdHZhciBuVG9wTWFyZ2luVGFibGUgPSAoX2h0T3B0aW9uLmhlaWdodCAtIGVsVGFibGUub2Zmc2V0SGVpZ2h0KSAvIDI7XG5cdFx0XHRcblx0XHRcdGlmIChuTGVmdE1hcmdpblRhYmxlID4gMCAmJiBuVG9wTWFyZ2luVGFibGUgPiAwKSB7XG5cdFx0XHRcdGVsVGFibGUuc3R5bGUubWFyZ2luID0gblRvcE1hcmdpblRhYmxlICsgXCJweCBcIiArIG5MZWZ0TWFyZ2luVGFibGUgKyBcInB4XCI7XHRcblx0XHRcdH1cblx0XHR9O1xuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIENsZWFyIHRoZSBRUkNvZGVcblx0XHQgKi9cblx0XHREcmF3aW5nLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuX2VsLmlubmVySFRNTCA9ICcnO1xuXHRcdH07XG5cdFx0XG5cdFx0cmV0dXJuIERyYXdpbmc7XG5cdH0pKCkgOiAoZnVuY3Rpb24gKCkgeyAvLyBEcmF3aW5nIGluIENhbnZhc1xuXHRcdGZ1bmN0aW9uIF9vbk1ha2VJbWFnZSgpIHtcblx0XHRcdHRoaXMuX2VsSW1hZ2Uuc3JjID0gdGhpcy5fZWxDYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuXHRcdFx0dGhpcy5fZWxJbWFnZS5zdHlsZS5zZXRQcm9wZXJ0eShcImRpc3BsYXlcIiwgXCJibG9ja1wiLCBcImltcG9ydGFudFwiKTtcblx0XHRcdHRoaXMuX2VsQ2FudmFzLnN0eWxlLnNldFByb3BlcnR5KFwiZGlzcGxheVwiLCBcIm5vbmVcIiwgXCJpbXBvcnRhbnRcIik7XG5cdFx0fVxuXHRcdFxuXHRcdC8vIEFuZHJvaWQgMi4xIGJ1ZyB3b3JrYXJvdW5kXG5cdFx0Ly8gaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2FuZHJvaWQvaXNzdWVzL2RldGFpbD9pZD01MTQxXG5cdFx0aWYgKHRoaXMuX2FuZHJvaWQgJiYgdGhpcy5fYW5kcm9pZCA8PSAyLjEpIHtcblx0ICAgIFx0dmFyIGZhY3RvciA9IDEgLyB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcblx0ICAgICAgICB2YXIgZHJhd0ltYWdlID0gQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELnByb3RvdHlwZS5kcmF3SW1hZ2U7IFxuXHQgICAgXHRDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlLmRyYXdJbWFnZSA9IGZ1bmN0aW9uIChpbWFnZSwgc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoKSB7XG5cdCAgICBcdFx0aWYgKChcIm5vZGVOYW1lXCIgaW4gaW1hZ2UpICYmIC9pbWcvaS50ZXN0KGltYWdlLm5vZGVOYW1lKSkge1xuXHRcdCAgICAgICAgXHRmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gMTsgaS0tKSB7XG5cdFx0ICAgICAgICAgICAgXHRhcmd1bWVudHNbaV0gPSBhcmd1bWVudHNbaV0gKiBmYWN0b3I7XG5cdFx0ICAgICAgICBcdH1cblx0ICAgIFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBkdyA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdCAgICBcdFx0XHRhcmd1bWVudHNbMV0gKj0gZmFjdG9yO1xuXHQgICAgXHRcdFx0YXJndW1lbnRzWzJdICo9IGZhY3Rvcjtcblx0ICAgIFx0XHRcdGFyZ3VtZW50c1szXSAqPSBmYWN0b3I7XG5cdCAgICBcdFx0XHRhcmd1bWVudHNbNF0gKj0gZmFjdG9yO1xuXHQgICAgXHRcdH1cblx0ICAgIFx0XHRcblx0ICAgICAgICBcdGRyYXdJbWFnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyBcblx0ICAgIFx0fTtcblx0XHR9XG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogQ2hlY2sgd2hldGhlciB0aGUgdXNlcidzIGJyb3dzZXIgc3VwcG9ydHMgRGF0YSBVUkkgb3Igbm90XG5cdFx0ICogXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmU3VjY2VzcyBPY2N1cnMgaWYgaXQgc3VwcG9ydHMgRGF0YSBVUklcblx0XHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmRmFpbCBPY2N1cnMgaWYgaXQgZG9lc24ndCBzdXBwb3J0IERhdGEgVVJJXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gX3NhZmVTZXREYXRhVVJJKGZTdWNjZXNzLCBmRmFpbCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgc2VsZi5fZkZhaWwgPSBmRmFpbDtcbiAgICAgICAgICAgIHNlbGYuX2ZTdWNjZXNzID0gZlN1Y2Nlc3M7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGl0IGp1c3Qgb25jZVxuICAgICAgICAgICAgaWYgKHNlbGYuX2JTdXBwb3J0RGF0YVVSSSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICAgICAgdmFyIGZPbkVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2JTdXBwb3J0RGF0YVVSSSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLl9mRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fZkZhaWwuY2FsbChzZWxmKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdmFyIGZPblN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fYlN1cHBvcnREYXRhVVJJID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fZlN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2ZTdWNjZXNzLmNhbGwoc2VsZik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZWwub25hYm9ydCA9IGZPbkVycm9yO1xuICAgICAgICAgICAgICAgIGVsLm9uZXJyb3IgPSBmT25FcnJvcjtcbiAgICAgICAgICAgICAgICBlbC5vbmxvYWQgPSBmT25TdWNjZXNzO1xuICAgICAgICAgICAgICAgIGVsLnNyYyA9IFwiZGF0YTppbWFnZS9naWY7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBVUFBQUFGQ0FZQUFBQ05ieWJsQUFBQUhFbEVRVlFJMTJQNC8vOC93MzhHSUFYRElCS0UwREh4Z2xqTkJBQU85VFhMMFk0T0h3QUFBQUJKUlU1RXJrSmdnZz09XCI7IC8vIHRoZSBJbWFnZSBjb250YWlucyAxcHggZGF0YS5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuX2JTdXBwb3J0RGF0YVVSSSA9PT0gdHJ1ZSAmJiBzZWxmLl9mU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHNlbGYuX2ZTdWNjZXNzLmNhbGwoc2VsZik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuX2JTdXBwb3J0RGF0YVVSSSA9PT0gZmFsc2UgJiYgc2VsZi5fZkZhaWwpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9mRmFpbC5jYWxsKHNlbGYpO1xuICAgICAgICAgICAgfVxuXHRcdH07XG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogRHJhd2luZyBRUkNvZGUgYnkgdXNpbmcgY2FudmFzXG5cdFx0ICogXG5cdFx0ICogQGNvbnN0cnVjdG9yXG5cdFx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gaHRPcHRpb24gUVJDb2RlIE9wdGlvbnMgXG5cdFx0ICovXG5cdFx0dmFyIERyYXdpbmcgPSBmdW5jdGlvbiAoZWwsIGh0T3B0aW9uKSB7XG4gICAgXHRcdHRoaXMuX2JJc1BhaW50ZWQgPSBmYWxzZTtcbiAgICBcdFx0dGhpcy5fYW5kcm9pZCA9IF9nZXRBbmRyb2lkKCk7XG5cdFx0XG5cdFx0XHR0aGlzLl9odE9wdGlvbiA9IGh0T3B0aW9uO1xuXHRcdFx0dGhpcy5fZWxDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuXHRcdFx0dGhpcy5fZWxDYW52YXMud2lkdGggPSBodE9wdGlvbi53aWR0aDtcblx0XHRcdHRoaXMuX2VsQ2FudmFzLmhlaWdodCA9IGh0T3B0aW9uLmhlaWdodDtcblx0XHRcdGVsLmFwcGVuZENoaWxkKHRoaXMuX2VsQ2FudmFzKTtcblx0XHRcdHRoaXMuX2VsID0gZWw7XG5cdFx0XHR0aGlzLl9vQ29udGV4dCA9IHRoaXMuX2VsQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblx0XHRcdHRoaXMuX2JJc1BhaW50ZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuX2VsSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuXHRcdFx0dGhpcy5fZWxJbWFnZS5hbHQgPSBcIlNjYW4gbWUhXCI7XG5cdFx0XHR0aGlzLl9lbEltYWdlLnN0eWxlLnNldFByb3BlcnR5KFwiZGlzcGxheVwiLCBcIm5vbmVcIiwgXCJpbXBvcnRhbnRcIik7XG5cdFx0XHR0aGlzLl9lbC5hcHBlbmRDaGlsZCh0aGlzLl9lbEltYWdlKTtcblx0XHRcdHRoaXMuX2JTdXBwb3J0RGF0YVVSSSA9IG51bGw7XG5cdFx0fTtcblx0XHRcdFxuXHRcdC8qKlxuXHRcdCAqIERyYXcgdGhlIFFSQ29kZVxuXHRcdCAqIFxuXHRcdCAqIEBwYXJhbSB7UVJDb2RlfSBvUVJDb2RlIFxuXHRcdCAqL1xuXHRcdERyYXdpbmcucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAob1FSQ29kZSkge1xuICAgICAgICAgICAgdmFyIF9lbEltYWdlID0gdGhpcy5fZWxJbWFnZTtcbiAgICAgICAgICAgIHZhciBfb0NvbnRleHQgPSB0aGlzLl9vQ29udGV4dDtcbiAgICAgICAgICAgIHZhciBfaHRPcHRpb24gPSB0aGlzLl9odE9wdGlvbjtcbiAgICAgICAgICAgIFxuXHRcdFx0dmFyIG5Db3VudCA9IG9RUkNvZGUuZ2V0TW9kdWxlQ291bnQoKTtcblx0XHRcdHZhciBuV2lkdGggPSBfaHRPcHRpb24ud2lkdGggLyBuQ291bnQ7XG5cdFx0XHR2YXIgbkhlaWdodCA9IF9odE9wdGlvbi5oZWlnaHQgLyBuQ291bnQ7XG5cdFx0XHR2YXIgblJvdW5kZWRXaWR0aCA9IE1hdGgucm91bmQobldpZHRoKTtcblx0XHRcdHZhciBuUm91bmRlZEhlaWdodCA9IE1hdGgucm91bmQobkhlaWdodCk7XG5cblx0XHRcdF9lbEltYWdlLnN0eWxlLnNldFByb3BlcnR5KFwiZGlzcGxheVwiLCBcIm5vbmVcIiwgXCJpbXBvcnRhbnRcIik7XG5cdFx0XHR0aGlzLmNsZWFyKCk7XG5cdFx0XHRcblx0XHRcdGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG5Db3VudDsgcm93KyspIHtcblx0XHRcdFx0Zm9yICh2YXIgY29sID0gMDsgY29sIDwgbkNvdW50OyBjb2wrKykge1xuXHRcdFx0XHRcdHZhciBiSXNEYXJrID0gb1FSQ29kZS5pc0Rhcmsocm93LCBjb2wpO1xuXHRcdFx0XHRcdHZhciBuTGVmdCA9IGNvbCAqIG5XaWR0aDtcblx0XHRcdFx0XHR2YXIgblRvcCA9IHJvdyAqIG5IZWlnaHQ7XG5cdFx0XHRcdFx0X29Db250ZXh0LnN0cm9rZVN0eWxlID0gYklzRGFyayA/IF9odE9wdGlvbi5jb2xvckRhcmsgOiBfaHRPcHRpb24uY29sb3JMaWdodDtcblx0XHRcdFx0XHRfb0NvbnRleHQubGluZVdpZHRoID0gMTtcblx0XHRcdFx0XHRfb0NvbnRleHQuZmlsbFN0eWxlID0gYklzRGFyayA/IF9odE9wdGlvbi5jb2xvckRhcmsgOiBfaHRPcHRpb24uY29sb3JMaWdodDtcdFx0XHRcdFx0XG5cdFx0XHRcdFx0X29Db250ZXh0LmZpbGxSZWN0KG5MZWZ0LCBuVG9wLCBuV2lkdGgsIG5IZWlnaHQpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIOyViO2LsCDslajrpqzslrTsi7Eg67Cp7KeAIOyymOumrFxuXHRcdFx0XHRcdF9vQ29udGV4dC5zdHJva2VSZWN0KFxuXHRcdFx0XHRcdFx0TWF0aC5mbG9vcihuTGVmdCkgKyAwLjUsXG5cdFx0XHRcdFx0XHRNYXRoLmZsb29yKG5Ub3ApICsgMC41LFxuXHRcdFx0XHRcdFx0blJvdW5kZWRXaWR0aCxcblx0XHRcdFx0XHRcdG5Sb3VuZGVkSGVpZ2h0XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRfb0NvbnRleHQuc3Ryb2tlUmVjdChcblx0XHRcdFx0XHRcdE1hdGguY2VpbChuTGVmdCkgLSAwLjUsXG5cdFx0XHRcdFx0XHRNYXRoLmNlaWwoblRvcCkgLSAwLjUsXG5cdFx0XHRcdFx0XHRuUm91bmRlZFdpZHRoLFxuXHRcdFx0XHRcdFx0blJvdW5kZWRIZWlnaHRcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHRoaXMuX2JJc1BhaW50ZWQgPSB0cnVlO1xuXHRcdH07XG5cdFx0XHRcblx0XHQvKipcblx0XHQgKiBNYWtlIHRoZSBpbWFnZSBmcm9tIENhbnZhcyBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBEYXRhIFVSSS5cblx0XHQgKi9cblx0XHREcmF3aW5nLnByb3RvdHlwZS5tYWtlSW1hZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodGhpcy5fYklzUGFpbnRlZCkge1xuXHRcdFx0XHRfc2FmZVNldERhdGFVUkkuY2FsbCh0aGlzLCBfb25NYWtlSW1hZ2UpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0XHRcblx0XHQvKipcblx0XHQgKiBSZXR1cm4gd2hldGhlciB0aGUgUVJDb2RlIGlzIHBhaW50ZWQgb3Igbm90XG5cdFx0ICogXG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHREcmF3aW5nLnByb3RvdHlwZS5pc1BhaW50ZWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYklzUGFpbnRlZDtcblx0XHR9O1xuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIENsZWFyIHRoZSBRUkNvZGVcblx0XHQgKi9cblx0XHREcmF3aW5nLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuX29Db250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl9lbENhbnZhcy53aWR0aCwgdGhpcy5fZWxDYW52YXMuaGVpZ2h0KTtcblx0XHRcdHRoaXMuX2JJc1BhaW50ZWQgPSBmYWxzZTtcblx0XHR9O1xuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IG5OdW1iZXJcblx0XHQgKi9cblx0XHREcmF3aW5nLnByb3RvdHlwZS5yb3VuZCA9IGZ1bmN0aW9uIChuTnVtYmVyKSB7XG5cdFx0XHRpZiAoIW5OdW1iZXIpIHtcblx0XHRcdFx0cmV0dXJuIG5OdW1iZXI7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKG5OdW1iZXIgKiAxMDAwKSAvIDEwMDA7XG5cdFx0fTtcblx0XHRcblx0XHRyZXR1cm4gRHJhd2luZztcblx0fSkoKTtcblx0XG5cdC8qKlxuXHQgKiBHZXQgdGhlIHR5cGUgYnkgc3RyaW5nIGxlbmd0aFxuXHQgKiBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHNUZXh0XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBuQ29ycmVjdExldmVsXG5cdCAqIEByZXR1cm4ge051bWJlcn0gdHlwZVxuXHQgKi9cblx0ZnVuY3Rpb24gX2dldFR5cGVOdW1iZXIoc1RleHQsIG5Db3JyZWN0TGV2ZWwpIHtcdFx0XHRcblx0XHR2YXIgblR5cGUgPSAxO1xuXHRcdHZhciBsZW5ndGggPSBfZ2V0VVRGOExlbmd0aChzVGV4dCk7XG5cdFx0XG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IFFSQ29kZUxpbWl0TGVuZ3RoLmxlbmd0aDsgaSA8PSBsZW47IGkrKykge1xuXHRcdFx0dmFyIG5MaW1pdCA9IDA7XG5cdFx0XHRcblx0XHRcdHN3aXRjaCAobkNvcnJlY3RMZXZlbCkge1xuXHRcdFx0XHRjYXNlIFFSRXJyb3JDb3JyZWN0TGV2ZWwuTCA6XG5cdFx0XHRcdFx0bkxpbWl0ID0gUVJDb2RlTGltaXRMZW5ndGhbaV1bMF07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgUVJFcnJvckNvcnJlY3RMZXZlbC5NIDpcblx0XHRcdFx0XHRuTGltaXQgPSBRUkNvZGVMaW1pdExlbmd0aFtpXVsxXTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBRUkVycm9yQ29ycmVjdExldmVsLlEgOlxuXHRcdFx0XHRcdG5MaW1pdCA9IFFSQ29kZUxpbWl0TGVuZ3RoW2ldWzJdO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFFSRXJyb3JDb3JyZWN0TGV2ZWwuSCA6XG5cdFx0XHRcdFx0bkxpbWl0ID0gUVJDb2RlTGltaXRMZW5ndGhbaV1bM107XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGlmIChsZW5ndGggPD0gbkxpbWl0KSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0blR5cGUrKztcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0aWYgKG5UeXBlID4gUVJDb2RlTGltaXRMZW5ndGgubGVuZ3RoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUb28gbG9uZyBkYXRhXCIpO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gblR5cGU7XG5cdH1cblxuXHRmdW5jdGlvbiBfZ2V0VVRGOExlbmd0aChzVGV4dCkge1xuXHRcdHZhciByZXBsYWNlZFRleHQgPSBlbmNvZGVVUkkoc1RleHQpLnRvU3RyaW5nKCkucmVwbGFjZSgvXFwlWzAtOWEtZkEtRl17Mn0vZywgJ2EnKTtcblx0XHRyZXR1cm4gcmVwbGFjZWRUZXh0Lmxlbmd0aCArIChyZXBsYWNlZFRleHQubGVuZ3RoICE9IHNUZXh0ID8gMyA6IDApO1xuXHR9XG5cdFxuXHQvKipcblx0ICogQGNsYXNzIFFSQ29kZVxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQGV4YW1wbGUgXG5cdCAqIG5ldyBRUkNvZGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXN0XCIpLCBcImh0dHA6Ly9qaW5kby5kZXYubmF2ZXIuY29tL2NvbGxpZVwiKTtcblx0ICpcblx0ICogQGV4YW1wbGVcblx0ICogdmFyIG9RUkNvZGUgPSBuZXcgUVJDb2RlKFwidGVzdFwiLCB7XG5cdCAqICAgIHRleHQgOiBcImh0dHA6Ly9uYXZlci5jb21cIixcblx0ICogICAgd2lkdGggOiAxMjgsXG5cdCAqICAgIGhlaWdodCA6IDEyOFxuXHQgKiB9KTtcblx0ICogXG5cdCAqIG9RUkNvZGUuY2xlYXIoKTsgLy8gQ2xlYXIgdGhlIFFSQ29kZS5cblx0ICogb1FSQ29kZS5tYWtlQ29kZShcImh0dHA6Ly9tYXAubmF2ZXIuY29tXCIpOyAvLyBSZS1jcmVhdGUgdGhlIFFSQ29kZS5cblx0ICpcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd9IGVsIHRhcmdldCBlbGVtZW50IG9yICdpZCcgYXR0cmlidXRlIG9mIGVsZW1lbnQuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gdk9wdGlvblxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdk9wdGlvbi50ZXh0IFFSQ29kZSBsaW5rIGRhdGFcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFt2T3B0aW9uLndpZHRoPTI1Nl1cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFt2T3B0aW9uLmhlaWdodD0yNTZdXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBbdk9wdGlvbi5jb2xvckRhcms9XCIjMDAwMDAwXCJdXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBbdk9wdGlvbi5jb2xvckxpZ2h0PVwiI2ZmZmZmZlwiXVxuXHQgKiBAcGFyYW0ge1FSQ29kZS5Db3JyZWN0TGV2ZWx9IFt2T3B0aW9uLmNvcnJlY3RMZXZlbD1RUkNvZGUuQ29ycmVjdExldmVsLkhdIFtMfE18UXxIXSBcblx0ICovXG5cdFFSQ29kZSA9IGZ1bmN0aW9uIChlbCwgdk9wdGlvbikge1xuXHRcdHRoaXMuX2h0T3B0aW9uID0ge1xuXHRcdFx0d2lkdGggOiAyNTYsIFxuXHRcdFx0aGVpZ2h0IDogMjU2LFxuXHRcdFx0dHlwZU51bWJlciA6IDQsXG5cdFx0XHRjb2xvckRhcmsgOiBcIiMwMDAwMDBcIixcblx0XHRcdGNvbG9yTGlnaHQgOiBcIiNmZmZmZmZcIixcblx0XHRcdGNvcnJlY3RMZXZlbCA6IFFSRXJyb3JDb3JyZWN0TGV2ZWwuSFxuXHRcdH07XG5cdFx0XG5cdFx0aWYgKHR5cGVvZiB2T3B0aW9uID09PSAnc3RyaW5nJykge1xuXHRcdFx0dk9wdGlvblx0PSB7XG5cdFx0XHRcdHRleHQgOiB2T3B0aW9uXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRcblx0XHQvLyBPdmVyd3JpdGVzIG9wdGlvbnNcblx0XHRpZiAodk9wdGlvbikge1xuXHRcdFx0Zm9yICh2YXIgaSBpbiB2T3B0aW9uKSB7XG5cdFx0XHRcdHRoaXMuX2h0T3B0aW9uW2ldID0gdk9wdGlvbltpXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0aWYgKHR5cGVvZiBlbCA9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5faHRPcHRpb24udXNlU1ZHKSB7XG5cdFx0XHREcmF3aW5nID0gc3ZnRHJhd2VyO1xuXHRcdH1cblx0XHRcblx0XHR0aGlzLl9hbmRyb2lkID0gX2dldEFuZHJvaWQoKTtcblx0XHR0aGlzLl9lbCA9IGVsO1xuXHRcdHRoaXMuX29RUkNvZGUgPSBudWxsO1xuXHRcdHRoaXMuX29EcmF3aW5nID0gbmV3IERyYXdpbmcodGhpcy5fZWwsIHRoaXMuX2h0T3B0aW9uKTtcblx0XHRcblx0XHRpZiAodGhpcy5faHRPcHRpb24udGV4dCkge1xuXHRcdFx0dGhpcy5tYWtlQ29kZSh0aGlzLl9odE9wdGlvbi50ZXh0KTtcdFxuXHRcdH1cblx0fTtcblx0XG5cdC8qKlxuXHQgKiBNYWtlIHRoZSBRUkNvZGVcblx0ICogXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzVGV4dCBsaW5rIGRhdGFcblx0ICovXG5cdFFSQ29kZS5wcm90b3R5cGUubWFrZUNvZGUgPSBmdW5jdGlvbiAoc1RleHQpIHtcblx0XHR0aGlzLl9vUVJDb2RlID0gbmV3IFFSQ29kZU1vZGVsKF9nZXRUeXBlTnVtYmVyKHNUZXh0LCB0aGlzLl9odE9wdGlvbi5jb3JyZWN0TGV2ZWwpLCB0aGlzLl9odE9wdGlvbi5jb3JyZWN0TGV2ZWwpO1xuXHRcdHRoaXMuX29RUkNvZGUuYWRkRGF0YShzVGV4dCk7XG5cdFx0dGhpcy5fb1FSQ29kZS5tYWtlKCk7XG5cdFx0dGhpcy5fZWwudGl0bGUgPSBzVGV4dDtcblx0XHR0aGlzLl9vRHJhd2luZy5kcmF3KHRoaXMuX29RUkNvZGUpO1x0XHRcdFxuXHRcdHRoaXMubWFrZUltYWdlKCk7XG5cdH07XG5cdFxuXHQvKipcblx0ICogTWFrZSB0aGUgSW1hZ2UgZnJvbSBDYW52YXMgZWxlbWVudFxuXHQgKiAtIEl0IG9jY3VycyBhdXRvbWF0aWNhbGx5XG5cdCAqIC0gQW5kcm9pZCBiZWxvdyAzIGRvZXNuJ3Qgc3VwcG9ydCBEYXRhLVVSSSBzcGVjLlxuXHQgKiBcblx0ICogQHByaXZhdGVcblx0ICovXG5cdFFSQ29kZS5wcm90b3R5cGUubWFrZUltYWdlID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgdGhpcy5fb0RyYXdpbmcubWFrZUltYWdlID09IFwiZnVuY3Rpb25cIiAmJiAoIXRoaXMuX2FuZHJvaWQgfHwgdGhpcy5fYW5kcm9pZCA+PSAzKSkge1xuXHRcdFx0dGhpcy5fb0RyYXdpbmcubWFrZUltYWdlKCk7XG5cdFx0fVxuXHR9O1xuXHRcblx0LyoqXG5cdCAqIENsZWFyIHRoZSBRUkNvZGVcblx0ICovXG5cdFFSQ29kZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fb0RyYXdpbmcuY2xlYXIoKTtcblx0fTtcblx0XG5cdC8qKlxuXHQgKiBAbmFtZSBRUkNvZGUuQ29ycmVjdExldmVsXG5cdCAqL1xuXHRRUkNvZGUuQ29ycmVjdExldmVsID0gUVJFcnJvckNvcnJlY3RMZXZlbDtcbn0pKCk7XG5cbmlmIChtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBRUkNvZGU7XG59XG4iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1FSQ29kZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDk5Y2QzNmMmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUVJDb2RlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUVJDb2RlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNDk5Y2QzNmMnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNDk5Y2QzNmMnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNDk5Y2QzNmMnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1FSQ29kZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDk5Y2QzNmMmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNDk5Y2QzNmMnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIm5vZGVfbW9kdWxlcy92dWUtcXJjb2RlLWNvbXBvbmVudC9zcmMvUVJDb2RlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsIlxyXG48dGVtcGxhdGU+XHJcbiAgICA8ZGl2PjwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICAgIGltcG9ydCBRUkNvZGUgZnJvbSAncXJjb2RlLWpzLXBhY2thZ2UvcXJjb2RlLmpzJ1xyXG4gICAgZXhwb3J0IGRlZmF1bHQge1xyXG5cclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICB0ZXh0OiB7dHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZX0sXHJcbiAgICAgICAgICAgIHNpemU6IHt0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiBmYWxzZSwgZGVmYXVsdDogMjU2fSxcclxuICAgICAgICAgICAgY29sb3I6IHt0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiBmYWxzZSwgZGVmYXVsdDogJyMwMDAnfSxcclxuICAgICAgICAgICAgYmdDb2xvcjoge3R5cGU6IFN0cmluZywgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0OiAnI0ZGRid9LFxyXG4gICAgICAgICAgICBlcnJvckxldmVsOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBTdHJpbmcsIFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09ICdMJyB8fCB2YWx1ZSA9PT0gJ00nIHx8IHZhbHVlID09PSAnUScgfHwgdmFsdWUgPT09ICdIJ1xyXG4gICAgICAgICAgICAgICAgfSwgXHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogJ0gnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB3YXRjaDoge1xyXG4gICAgICAgICAgICB0ZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1ha2VDb2RlKHRoaXMudGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkYXRhKCkge1xyXG4gICAgICAgICAgICByZXR1cm57XHJcbiAgICAgICAgICAgICAgICBxckNvZGU6IHt9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtb3VudGVkKCkge1xyXG4gICAgICAgICAgICB0aGlzLnFyQ29kZSA9IG5ldyBRUkNvZGUodGhpcy4kZWwsIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMudGV4dCxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnNpemUsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc2l6ZSxcclxuICAgICAgICAgICAgICAgIGNvbG9yRGFyayA6IHRoaXMuY29sb3IsXHJcbiAgICAgICAgICAgICAgICBjb2xvckxpZ2h0IDogdGhpcy5iZ0NvbG9yLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdExldmVsIDogUVJDb2RlLkNvcnJlY3RMZXZlbFt0aGlzLmVycm9yTGV2ZWxdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucXJDb2RlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1ha2VDb2RlOiBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xckNvZGUubWFrZUNvZGUodGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbjwvc2NyaXB0PiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vTWFpbldhbGxldERldGFpbC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MjlmODA2OWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vTWFpbldhbGxldERldGFpbC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL01haW5XYWxsZXREZXRhaWwudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMjlmODA2OWUnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMjlmODA2OWUnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMjlmODA2OWUnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL01haW5XYWxsZXREZXRhaWwudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTI5ZjgwNjllJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzI5ZjgwNjllJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvc3JjL2NvbXBvbmVudHMvd2FsbGV0cy9NYWluV2FsbGV0RGV0YWlsLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtNVswXS5ydWxlc1swXS51c2VbMF0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9NYWluV2FsbGV0RGV0YWlsLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC01WzBdLnJ1bGVzWzBdLnVzZVswXSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01haW5XYWxsZXREZXRhaWwudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUVJDb2RlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUVJDb2RlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9NYWluV2FsbGV0RGV0YWlsLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yOWY4MDY5ZSZcIiIsInZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIpXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgW1xuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZCBtYi0xXCIgfSwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWJvZHlcIiB9LCBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlclwiLFxuICAgICAgICAgICAgY2xhc3M6XG4gICAgICAgICAgICAgIF92bS5wbGF0LnRyYWRpbmcucHJhY3RpY2UgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBfdm0ucGxhdC50cmFkaW5nLnByYWN0aWNlICE9IDFcbiAgICAgICAgICAgICAgICA/IFwiIGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCJcbiAgICAgICAgICAgICAgICA6IFwiIGp1c3RpZnktY29udGVudC1zdGFydFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX3ZtLndhbC5zeW1ib2wgIT0gbnVsbFxuICAgICAgICAgICAgICA/IF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImF2YXRhci1jb250ZW50IG1lLTEgZC1ub25lIGQtc20tYmxvY2tcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNyYzogX3ZtLndhbC5zeW1ib2xcbiAgICAgICAgICAgICAgICAgICAgICA/IFwiL2Fzc2V0cy9pbWFnZXMvY3J5cHRvQ3VycmVuY3kvXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLndhbC5zeW1ib2wudG9Mb3dlckNhc2UoKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIi5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgIDogXCIvbWFya2V0L25vdGlmaWNhdGlvbi5wbmdcIixcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgOiBfYyhcInZ1ZS1za2VsZXRvbi1sb2FkZXJcIiwge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJjaXJjbGVcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDY0LFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDY0LFxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb246IFwiZmFkZVwiLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfdm0ud2FsLnN5bWJvbCAhPSBudWxsXG4gICAgICAgICAgICAgID8gX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiZnctYm9sZCBmcy00IGQtbm9uZSBkLWxnLWJsb2NrXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0ud2FsLnN5bWJvbCkgKyBcIlxcbiAgICAgICAgICAgICAgICAgICAgXCIpLFxuICAgICAgICAgICAgICAgICAgX3ZtLmFwaSA9PSAxXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXCJzcGFuXCIsIFtfdm0uX3YoX3ZtLl9zKF92bS50eXBlLnRvVXBwZXJDYXNlKCkpICsgXCIgXCIpXSlcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLiR0KFwiV2FsbGV0XCIpKSksXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgOiBfYyhcInZ1ZS1za2VsZXRvbi1sb2FkZXJcIiwge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZC1ub25lIGQtbGctYmxvY2tcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicmVjdFwiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwLFxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb246IFwiZmFkZVwiLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfdm0ucGxhdC50cmFkaW5nLnByYWN0aWNlICE9IG51bGwgJiYgX3ZtLnBsYXQudHJhZGluZy5wcmFjdGljZSAhPSAxXG4gICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJkLWZsZXgganVzdGlmeS1jb250ZW50LXN0YXJ0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidG4gYnRuLXN1Y2Nlc3MgbWUtMVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLWJzLXRvZ2dsZVwiOiBcIm1vZGFsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtYnMtdGFyZ2V0XCI6IFwiI2RlcG9zaXRcIixcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJpXCIsIHsgc3RhdGljQ2xhc3M6IFwiYmkgYmktd2FsbGV0MlwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS4kdChcIkRlcG9zaXRcIikpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ0biBidG4td2FybmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLWJzLXRvZ2dsZVwiOiBcIm1vZGFsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtYnMtdGFyZ2V0XCI6IFwiI3dpdGhkcmF3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaVwiLCB7IHN0YXRpY0NsYXNzOiBcImJpIGJpLWpvdXJuYWwtYXJyb3ctZG93blwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLiR0KFwiV2l0aGRyYXdcIikpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgXSksXG4gICAgXSksXG4gICAgX3ZtLl92KFwiIFwiKSxcbiAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmRcIiB9LCBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNhcmQgbWItMFwiLFxuICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IG92ZXJmbG93OiBcImF1dG9cIiB9LFxuICAgICAgICAgIGF0dHJzOiB7IGlkOiBcInRhYmxlLWhvdmVyLXJvd1wiIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtaGVhZGVyXCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJoNFwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtdGl0bGVcIiB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLiR0KFwiV2FsbGV0IFRyYW5zYWN0aW9uc1wiKSkpLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRhYmxlLXJlc3BvbnNpdmVcIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHtcbiAgICAgICAgICAgICAgICBcIm1pbi1oZWlnaHRcIjogXCI1N3ZoXCIsXG4gICAgICAgICAgICAgICAgXCJtYXgtaGVpZ2h0XCI6IFwiNTd2aFwiLFxuICAgICAgICAgICAgICAgIFwib3ZlcmZsb3cteVwiOiBcImF1dG9cIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidGFibGVcIiwgeyBzdGF0aWNDbGFzczogXCJ0YWJsZSB0YWJsZUZpeEhlYWRcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJ0aGVhZFwiLCBbXG4gICAgICAgICAgICAgICAgICBfYyhcInRyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJ0aFwiLCBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJUeXBlXCIpKSldKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJ0aFwiLCBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJJbmZvXCIpKSldKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJ0aFwiLCBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJUcmFuc2FjdGlvblwiKSkpXSksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFwidGhcIiwgW192bS5fdihfdm0uX3MoX3ZtLiR0KFwiU3RhdHVzXCIpKSldKSxcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX3ZtLndhbF90cnggIT0gbnVsbCAmJiBfdm0ud2FsX3RyeC5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwidGJvZHlcIixcbiAgICAgICAgICAgICAgICAgICAgICB7IGtleTogX3ZtLndhbF90cngubGVuZ3RoIH0sXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS53YWxfdHJ4LCBmdW5jdGlvbiAodHJ4LCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwidHJcIiwgeyBrZXk6IGluZGV4IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF2YXRhciBiZy1saWdodC1wcmltYXJ5IHJvdW5kZWQgZmxvYXQtc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgXCJtYXgtaGVpZ2h0XCI6IFwiMzBweFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImF2YXRhci1jb250ZW50XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeC5vcGVyYXRpb25UeXBlID09IFwiREVQT1NJVFwiIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ4Lm9wZXJhdGlvblR5cGUgPT0gXCJQQVlNRU5UXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJpXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dC1zdWNjZXNzIGZzLTMgYmkgYmktd2FsbGV0MlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0cngub3BlcmF0aW9uVHlwZSA9PSBcIldJVEhEUkFXQUxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQtZGFuZ2VyIGZzLTNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfYyhcImlcIiwgeyBzdGF0aWNDbGFzczogXCJiaSBiaS1jYXNoXCIgfSldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXdhcm5pbmdcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLiR0KFwiQW1vdW50XCIpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjpcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ4LmFtb3VudCAhPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcInRvTW9uZXlcIikodHJ4LmFtb3VudCwgNClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS53YWwuc3ltYm9sKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC13YXJuaW5nXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS4kdChcIlZhbHVlXCIpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiAoVVNEKTpcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcInRvTW9uZXlcIikodHJ4Lm1hcmtldFZhbHVlLmFtb3VudCwgNClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXdhcm5pbmdcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLiR0KFwiUmVmZXJlbmNlIElEXCIpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjpcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyh0cngucmVmZXJlbmNlKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ4Lm9wZXJhdGlvblR5cGUgPT0gXCJERVBPU0lUXCIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cngub3BlcmF0aW9uVHlwZSA9PSBcIlBBWU1FTlRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImF2YXRhci1ncm91cFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX20oMCwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX20oMSwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImF2YXRhciBwdWxsLXVwIG15LTBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtYnMtdG9nZ2xlXCI6IFwidG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1wb3B1cFwiOiBcInRvb2x0aXAtY3VzdG9tXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLWJzLXBsYWNlbWVudFwiOiBcInRvcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0cnguc3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImF2YXRhci1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogdHJ4LnN5bWJvbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiL2Fzc2V0cy9pbWFnZXMvY3J5cHRvQ3VycmVuY3kvXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeC5zeW1ib2wudG9Mb3dlckNhc2UoKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIi9tYXJrZXQvbm90aWZpY2F0aW9uLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0OiBcIkF2YXRhclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRyeC5vcGVyYXRpb25UeXBlID09IFwiV0lUSERSQVdBTFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYXZhdGFyLWdyb3VwXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYXZhdGFyIHB1bGwtdXAgbXktMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1icy10b2dnbGVcIjogXCJ0b29sdGlwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXBvcHVwXCI6IFwidG9vbHRpcC1jdXN0b21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtYnMtcGxhY2VtZW50XCI6IFwidG9wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRyeC5hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImF2YXRhci1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogX3ZtLndhbC5zeW1ib2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIi9hc3NldHMvaW1hZ2VzL2NyeXB0b0N1cnJlbmN5L1wiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ud2FsLnN5bWJvbC50b0xvd2VyQ2FzZSgpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIi5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiL21hcmtldC9ub3RpZmljYXRpb24ucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ6IFwiQXZhdGFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbSgyLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbSgzLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLl9mKFwidG9EYXRlXCIpKHRyeC5jcmVhdGVkKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIDogX2MoXCJ0Ym9keVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJ0clwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC1tdXRlZCB0ZXh0LWNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbHNwYW46IFwiMTAwJVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMTI4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMTI4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcImh0dHBzOi8vYXNzZXRzLnN0YXRpY2ltZy5jb20vcHJvLzIuMC40L2ltYWdlcy9lbXB0eS5zdmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicFwiLCB7fSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJObyBEYXRhIEZvdW5kXCIpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICBdXG4gICAgICApLFxuICAgIF0pLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAge1xuICAgICAgICBzdGF0aWNDbGFzczogXCJtb2RhbCBmYWRlXCIsXG4gICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgaWQ6IFwiZGVwb3NpdFwiLFxuICAgICAgICAgIHRhYmluZGV4OiBcIi0xXCIsXG4gICAgICAgICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogXCJkZXBvc2l0XCIsXG4gICAgICAgICAgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1kaWFsb2cgbW9kYWwtZGlhbG9nLWNlbnRlcmVkIG1vZGFsLWxnXCIgfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfdm0uYWRkcmVzc2VzICE9IG51bGxcbiAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm1vZGFsLWNvbnRlbnRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm1vZGFsLWhlYWRlciBiZy10cmFuc3BhcmVudFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJoNVwiLCB7IHN0YXRpY0NsYXNzOiBcIm1vZGFsLXRpdGxlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLiR0KFwiU2VsZWN0IERlcG9zaXQgTmV0d29ya1wiKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJidXR0b25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ0bi1jbG9zZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLWJzLWRpc21pc3NcIjogXCJtb2RhbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IFwiQ2xvc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInVsXCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibmF2IG5hdi10YWJzXCIsIGF0dHJzOiB7IHJvbGU6IFwidGFibGlzdFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0uYWRkcmVzc2VzLCBmdW5jdGlvbiAod2FsbGV0LCBrZXksIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ubmV0d29ya3MuaW5kZXhPZihrZXkpICE9PSAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IGluZGV4LCBzdGF0aWNDbGFzczogXCJuYXYtaXRlbVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJuYXYtbGlua1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogaW5kZXggPT0gMCA/IFwiYWN0aXZlXCIgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBrZXkgKyBcIi10YWJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtYnMtdG9nZ2xlXCI6IFwidGFiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLWJzLXRhcmdldFwiOiBcIiNcIiArIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiBcInRhYlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1zZWxlY3RlZFwiOiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWNvbnRyb2xzXCI6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhrZXkpKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0YWItY29udGVudFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLmFkZHJlc3NlcywgZnVuY3Rpb24gKHdhbGxldCwga2V5LCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm5ldHdvcmtzLmluZGV4T2Yoa2V5KSAhPT0gLTFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0YWItcGFuZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBpbmRleCA9PSAwID8gXCJhY3RpdmVcIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IGtleSwgcm9sZTogXCJ0YWJwYW5lbFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIm1vZGFsLWJvZHkgcGItMyBweC1zbS0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtbGctMyBjb2wtbWQtNVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtLWNvbnRyb2wtbGFiZWwgaDZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJUb1wiKSkpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInFyLWNvZGVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplOiAxNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB3YWxsZXQuYWRkcmVzc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHdhbGxldC5hZGRyZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLWxnLTkgY29sLW1kLTdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybS1jb250cm9sLWxhYmVsIGg2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yOiBcInJlY2lldmluZ19hZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiR0KFwiV2FsbGV0IEFkZHJlc3NcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaWV2aW5nX2FkZHJlc3NcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZJbkZvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB3YWxsZXQuYWRkcmVzc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gd2FsbGV0LmFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gbXQtMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kdChcIlRyYW5zZmVyIExpbWl0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uJHQoXCJVbmxpbWl0ZWRcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaHJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b2tlbiAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b2tlbi5oYXNfbWVtbyA9PSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbGxldC5tZW1vICE9IFwiXCIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbGV0Lm1lbW8gIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiR0KFwiTWVtb1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LXdhcm5pbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsZXQubWVtb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHdhbGxldC5tZW1vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJoclwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtdC0xXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLiR0KFwiVGhpcyBpcyBhXCIpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjoga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZJbkZvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC1pbmZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3Moa2V5ID8ga2V5IDogXCJcIikpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNoYWluIGFkZHJlc3MuIERvIG5vdCBzZW5kIGFueSBvdGhlciBDaGFpbiB0byB0aGlzIGFkZHJlc3Mgb3IgeW91ciBmdW5kcyBtYXkgYmUgbG9zdC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiLlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF1cbiAgICAgICAgKSxcbiAgICAgIF1cbiAgICApLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAge1xuICAgICAgICBzdGF0aWNDbGFzczogXCJtb2RhbCBmYWRlXCIsXG4gICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgaWQ6IFwid2l0aGRyYXdcIixcbiAgICAgICAgICB0YWJpbmRleDogXCItMVwiLFxuICAgICAgICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IFwid2l0aGRyYXdcIixcbiAgICAgICAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIFtcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIm1vZGFsLWRpYWxvZyBtb2RhbC1kaWFsb2ctY2VudGVyZWQgbW9kYWwtbGdcIiB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibW9kYWwtY29udGVudFwiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1oZWFkZXIgYmctdHJhbnNwYXJlbnRcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJoNVwiLCB7IHN0YXRpY0NsYXNzOiBcIm1vZGFsLXRpdGxlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLiR0KFwiU2VsZWN0IFdpdGhkcmF3IE5ldHdvcmtcIikpICtcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidG4tY2xvc2VcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YS1icy1kaXNtaXNzXCI6IFwibW9kYWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IFwiQ2xvc2VcIixcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInVsXCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJuYXYgbmF2LXRhYnNcIiwgYXR0cnM6IHsgcm9sZTogXCJ0YWJsaXN0XCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0uYWRkcmVzc2VzLCBmdW5jdGlvbiAod2FsbGV0LCBrZXksIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLm5ldHdvcmtzLmluZGV4T2Yoa2V5KSAhPT0gLTFcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJsaVwiLCB7IGtleTogaW5kZXgsIHN0YXRpY0NsYXNzOiBcIm5hdi1pdGVtXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdi1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBpbmRleCA9PSAwID8gXCJhY3RpdmVcIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGtleSArIFwiLXdpdGhkcmF3LXRhYlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1icy10b2dnbGVcIjogXCJ0YWJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtYnMtdGFyZ2V0XCI6IFwiI1wiICsga2V5ICsgXCItd2l0aGRyYXdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiBcInRhYlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1zZWxlY3RlZFwiOiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWNvbnRyb2xzXCI6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhrZXkpKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0YWItY29udGVudFwiIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5hZGRyZXNzZXMsIGZ1bmN0aW9uICh3YWxsZXQsIGtleSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0ubmV0d29ya3MuaW5kZXhPZihrZXkpICE9PSAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0YWItcGFuZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IGluZGV4ID09IDAgPyBcImFjdGl2ZVwiIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBrZXkgKyBcIi13aXRoZHJhd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiBcInRhYnBhbmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFkZC1uZXctcmVjb3JkIG1vZGFsLWNvbnRlbnQgcHQtMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJtaXQ6IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5XaXRoZHJhdyhrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIm1vZGFsLWJvZHkgcGItMyBweC1zbS0zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtYi0xXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvcm0tY29udHJvbC1sYWJlbCBoNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBmb3I6IFwid2FsbGV0X2JhbGFuY2VcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uJHQoXCJXYWxsZXQgQmFsYW5jZVwiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGV4dFwiLCByZWFkb25seTogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbGV0LmJhbGFuY2UgKyBcIiBcIiArIF92bS5zeW1ib2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImlucHV0LWdyb3VwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJpbnB1dC1ncm91cC10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcjogXCJ3aXRoZHJhd19hZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uJHQoXCJXYWxsZXQgQWRkcmVzc1wiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLndpdGhkcmF3X2FkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIndpdGhkcmF3X2FkZHJlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJ0ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLndpdGhkcmF3X2FkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS53aXRoZHJhd19hZGRyZXNzID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibXktMVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImlucHV0LWdyb3VwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZ3JvdXAtdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZm9yOiBcImFtb3VudFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJBbW91bnRcIikpKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLndpdGhkcmF3X2Ftb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJ3aXRoZHJhd19hbW91bnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbjogX3ZtLnRva2VuLndpdGhkcmF3X21pbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IF92bS50b2tlbi53aXRoZHJhd19taW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg6IF92bS50b2tlbi53aXRoZHJhd19tYXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS53aXRoZHJhd19hbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLndpdGhkcmF3X2Ftb3VudCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzbWFsbFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uJHQoXCJNaW5cIikpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjpcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQtd2FybmluZ1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcInRvTW9uZXlcIikoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnRva2VuLndpdGhkcmF3X21pbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS4kdChcIk1heFwiKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiOlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGV4dC13YXJuaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwidG9Nb25leVwiKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udG9rZW4ud2l0aGRyYXdfbWF4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udG9rZW4gIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udG9rZW4uaGFzX21lbW8gPT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJteS0xXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZ3JvdXBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnB1dC1ncm91cC10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZm9yOiBcIm1lbW9cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS4kdChcIk1lbW9cIikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS53aXRoZHJhd19tZW1vLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aXRoZHJhd19tZW1vXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS53aXRoZHJhd19tZW1vLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC50YXJnZXQuY29tcG9zaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ud2l0aGRyYXdfbWVtbyA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJpbnB1dC1ncm91cCBtdC0xXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJpbnB1dC1ncm91cC10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZm9yOiBcImZlZXNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJGZWVzXCIpKSldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b2tlbi53aXRoZHJhd19mZWUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnRva2VuLnN5bWJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1mb290ZXIgdGV4dC1lbmRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ0biBidG4tc3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdWJtaXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IF92bS5sb2FkaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uJHQoXCJXaXRoZHJhd1wiKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgIF1cbiAgICAgICAgKSxcbiAgICAgIF1cbiAgICApLFxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24gKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQtc3VjY2VzcyBmcy0zXCIgfSwgW1xuICAgICAgX2MoXCJpXCIsIHsgc3RhdGljQ2xhc3M6IFwiYmkgYmktd2FsbGV0MlwiIH0pLFxuICAgIF0pXG4gIH0sXG4gIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm15LTAgbXgtMiB0ZXh0LXN1Y2Nlc3MgZnMtMyBtcy1xXCIgfSwgW1xuICAgICAgX2MoXCJpXCIsIHsgc3RhdGljQ2xhc3M6IFwiYmkgYmktYXJyb3ctcmlnaHRcIiB9KSxcbiAgICBdKVxuICB9LFxuICBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJteS0wIG14LTIgdGV4dC1zdWNjZXNzIGZzLTMgbXMtMVwiIH0sIFtcbiAgICAgIF9jKFwiaVwiLCB7IHN0YXRpY0NsYXNzOiBcImJpIGJpLWFycm93LXJpZ2h0XCIgfSksXG4gICAgXSlcbiAgfSxcbiAgZnVuY3Rpb24gKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQtc3VjY2VzcyBmcy0zXCIgfSwgW1xuICAgICAgX2MoXCJpXCIsIHsgc3RhdGljQ2xhc3M6IFwiYmkgYmktd2FsbGV0MlwiIH0pLFxuICAgIF0pXG4gIH0sXG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSJdLCJuYW1lcyI6WyJwcm9wcyIsImNvbXBvbmVudHMiLCJkYXRhIiwid2FsIiwid2FsX3RyeCIsImFkZHJlc3NlcyIsImdubCIsImxvYWRpbmciLCJhcGkiLCJwYXRobmFtZSIsInBsYXQiLCJ3aXRoZHJhd19tZW1vIiwid2l0aGRyYXdfYW1vdW50Iiwid2l0aGRyYXdfYWRkcmVzcyIsIm5ldHdvcmsiLCJ0b2tlbiIsIm5ldHdvcmtzIiwibWV0aG9kcyIsImZldGNoRGF0YSIsInBvc3QiLCJ0aGVuIiwiZmV0Y2hXYWxsZXRUcngiLCJXaXRoZHJhdyIsImNoYWluIiwic3ltYm9sIiwibWVtbyIsImFtb3VudCIsIiQiLCJjcmVhdGVkIiwibW91bnRlZCIsImRlc3Ryb3llZCJdLCJzb3VyY2VSb290IjoiIn0=