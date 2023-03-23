{ /// 

// 0x3130 start full width single ..? 
// 0xffa0 start half width single ..? 

	// hanguelFHPatcher.js 
const [ gieughieuhCatch, rgFullPatch, rgHalfPatch ] // [ㄱ-ㅎ]|[ﾡ-ﾾ] 
	= hanguelFHPatcher ` rg_fs 0x3131 0x314e rg_hs 0xffa1 0xffbe ` 
	// [ /(?<rg_fs>[\u3131-\u314e])|(?<rg_hs>[\uffa1-\uffbe])/ , ... patchs ] 

// 0xffbf 0xffc1 // undefined at full single 

const [ aeCatch, kpFullPatch, kpHalfPatch ] // [ㅏ-ㅔ]|[ￂ-ￇ] 
	= hanguelFHPatcher ` kp_fs 0x314f 0x3154 kp_hs 0xffc2 0xffc7 ` 

// 0xffc8 0xffc9 // undefined at full single 

const [ yeoooeCatch, uhlFullPatch, uhlHalfPatch ] // [ㅕ-ㅚ]|[ￊ-ￏ] 
	= hanguelFHPatcher ` uhl_fs 0x3155 0x315a uhl_hs 0xffca 0xffcf ` 

// 0xffd0 0xffd1 // undefined at full single 

const [ yoyuCatch, ybFullPatch, ybHalfPatch ] // [ㅛ-ㅠ]|[ￒ-ￗ] 
	= hanguelFHPatcher ` yb_fs 0x315b 0x3160 yb_hs 0xffd2 0xffd7 ` 

// 0xffd8 0xffd9 // undefined at full single 

const [ euiCatch, mlFullPatch, mlHalfPatch ] // [ㅡ-ㅣ]|[ￚ-ￜ] 
	= hanguelFHPatcher ` ml_fs 0x3161 0x3163 ml_hs 0xffda 0xffdc ` 

// 0x3164 blank ..? 
// 0xffda 0xffdf blank ..? 

// 0x3165 0x318e // undefined at half single 
// 0x318f // ..? 

const untilNotNull = patchs => { 
	const replaceOn = ( ... ar ) => { 
		const groups = ar .at( -1 ) 
		for ( const patch of patchs ) { 
			const result = patch( groups ) 
			if ( result != null ) { 
				return result 
				} // -- if != null 
			} // -- for of patchs  
		} // -- replaceOn() 
	
	return { replaceOn } 
	} // -- untilNotNull() 

const hanguelSingleCatchOrders = 
	[ gieughieuhCatch .source 
	, aeCatch .source 
	, yeoooeCatch .source 
	, yoyuCatch .source 
	, euiCatch .source 
	] // -- hanguelSingleCatchOrders[] 
const fullPatches 
	= [ rgFullPatch, kpFullPatch, uhlFullPatch, ybFullPatch, mlFullPatch ] 
const halfPatches 
	= [ rgHalfPatch, kpHalfPatch, uhlHalfPatch, ybHalfPatch, mlHalfPatch ] 

const hanguelCatch = RegExp( hanguelSingleCatchOrders .join `|`, 'gu' ) 
const fullReplaceBy = untilNotNull( fullPatches ) .replaceOn  
const halfReplaceBy = untilNotNull( halfPatches ) .replaceOn 

const fullSingleReplace = ( ... ar ) => { 
		// hanguelFHPatcher.js 
	const order = rawValue( ... ar ) 
	
	return order .replace( hanguelCatch, fullReplaceBy ) 
	} // -- fullSingleReplace() 

const halfSingleReplace = ( ... ar ) => { 
	const order = rawValue( ... ar ) 
	
	return order .replace( hanguelCatch, halfReplaceBy ) 
	} // -- halfSingleReplace() 

const orders = 
	[ q => fullSingleReplace `ㄱㅏㅇㄴㅏㅁ` 
	, q => halfSingleReplace `ㄱㅏㅇㄴㅏㅁ` 
	] // -- orders 

for ( const order of orders ) { 
	console .log( '%o // %s', order(), order ) 
	} // -- for of orders 

} /// 
// idea from https://twitter.com/znzinc01/status/1638480817772183552 
