{ /// 

const hanAtThrees = [ ... rangeFromCodePoint([ 0x3161, 0x318f ]) ] 
const hanAtFs = [ ... rangeFromCodePoint([ 0xffda, 0xffdf ]) ] 

// 0x3130 start full width single ..? 
// 0xffa0 start half width single ..? 

const hanguelFHReplacer = ( ... ar ) => { 
	const order = rawValue( ... ar ) 
	
	const [ fOrder, hOrder ] = order .matchAll( nameFromNToNCatcher ) 
	const fGroups = fOrder .groups 
	const hGroups = hOrder .groups 
	
	const fCatchOrder = getCatchOrder( fGroups ) 
	const hCatchOrder = getCatchOrder( hGroups ) 
	const catcher = RegExp( `${ fCatchOrder }|${ hCatchOrder }` ) 
	
	const fullPatch = groups => 
		( groups ?.[ fGroups .name ] 
			? groups[ fGroups .name ] 
		: groups ?.[ hGroups .name ] 
			? codeByTo( groups[ hGroups .name ], hGroups .fromN, fGroups .fromN ) 
		: null 
		) // -- fullPatch() 
	
	const halfPatch = groups => 
		( groups ?.[ hGroups .name ] 
			? groups[ hGroups .name ] 
		: groups ?.[ fGroups .name ] 
			? codeByTo( groups[ fGroups .name ], fGroups .fromN, hGroups .fromN ) 
		: null 
		) // -- halfPatch() 
	
	return [ catcher, fullPatch, halfPatch ] 
	} // -- hanguelFHReplacer() 

const nameFromNToNCatcher 
	= /\s*(?<name>\S+)\s*(?<fromN>(?=\d)\S+)\s*(?<toN>(?=\d)\S+)?\s*(?=[^\s\d]|$)/gy 
const getCatchOrder = groups => 
	`(?<${ groups .name }>[\\u${ toFFFF( groups .fromN ) }-\\u${ toFFFF( groups .toN ) }])` 
const toFFFF = numStr => 
	`0000${ Number( numStr ) .toString `16` }` .slice( -4 ) 

const codeByTo = ( code, by, to ) => 
	String .fromCodePoint( code .codePointAt() - Number( by ) + Number( to ) ) 

const fromCodePoint = ( ... ar ) => { 
	const order = rawValue( ... ar ) 
	const matches = order .match( /\S+/g ) 
	
	return String .fromCodePoint( ... matches ) 
	} // -- fromCodePoint() 

const rawValue = ( ...ar ) => { 
	const [ rawo ] = ar 
	return rawo ?.raw ? String .raw( ... ar ) : rawo 
	} // -- rawValue() 

const untilNotNull = patchOrders => { 
	const replaceBy = ( ... ar ) => { 
		const matched = ar .at( -1 ) 
		for ( const F of patchOrders ) { 
			const result = F( matched ) 
			if ( result != null ) { 
				return result 
				} // -- if != null 
			} // -- for of fullPatchOrders 
		} // -- replaceBy() 
	
	return { replaceBy } 
	} // -- untilNotNull() 

// .. to effect .. 

const [ gieughieuhCatch, rgFullPatch, rgHalfPatch ] // [ㄱ-ㅎ]|[ﾡ-ﾾ] 
	= hanguelFHReplacer ` rg_fs 0x3131 0x314e rg_hs 0xffa1 0xffbe ` 
	// [ /(?<rg_fs>[\u3131-\u314e])|(?<rg_hs>[\uffa1-\uffbe])/ , ... patchs ] 

// 0xffbf 0xffc1 // undefined at full single 

const [ aeCatch, kpFullPatch, kpHalfPatch ] // [ㅏ-ㅔ]|[ￂ-ￇ] 
	= hanguelFHReplacer ` kp_fs 0x314f 0x3154 kp_hs 0xffc2 0xffc7 ` 

// 0xffc8 0xffc9 // undefined at full single 

const [ yeoooeCatch, uhlFullPatch, uhlHalfPatch ] // [ㅕ-ㅚ]|[ￊ-ￏ] 
	= hanguelFHReplacer ` uhl_fs 0x3155 0x315a uhl_hs 0xffca 0xffcf ` 

// 0xffd0 0xffd1 // undefined at full single 

const [ yoyuCatch, ybFullPatch, ybHalfPatch ] // [ㅛ-ㅠ]|[ￒ-ￗ] 
	= hanguelFHReplacer ` yb_fs 0x315b 0x3160 yb_hs 0xffd2 0xffd7 ` 

// 0xffd8 0xffd9 // undefined at full single 

const [ euiCatch, mlFullPatch, mlHalfPatch ] // [ㅡ-ㅣ][ￚ-ￜ] 
	= hanguelFHReplacer ` ml_fs 0x3161 0x3163 ml_hs 0xffda 0xffdc ` 

// 0x3164 blank ..? 
// 0xffda 0xffdf blank ..? 

// 0x3165 0x318e // undefined at half single 
// 0x318f // ..? 

const hanguelSingleCatchOrders = 
	[ gieughieuhCatch .source 
	, aeCatch .source 
	, yeoooeCatch .source 
	, yoyuCatch .source 
	, euiCatch .source 
	] // -- hanguelSingleCatchOrders[] 
const fullPatchOrders = [ rgFullPatch, kpFullPatch, uhlFullPatch, ybFullPatch, mlFullPatch ] 
const halfPatchOrders = [ rgHalfPatch, kpHalfPatch, uhlHalfPatch, ybHalfPatch, mlHalfPatch ] 

const hanguelCatch = RegExp( hanguelSingleCatchOrders .join `|`, 'g' ) 
const fullPatch = untilNotNull( fullPatchOrders ) .replaceBy  
const halfPatch = untilNotNull( halfPatchOrders ) .replaceBy 

const fullSingleReplace = ( ... ar ) => { 
	const order = rawValue( ... ar ) 
	
	return order .replace( hanguelCatch, fullPatch ) 
	} // -- fullSingleReplace() 

const halfSingleReplace = ( ... ar ) => { 
	const order = rawValue( ... ar ) 
	
	return order .replace( hanguelCatch, halfPatch ) 
	} // -- halfSingleReplace() 

console .log( fullSingleReplace `ㄱㅏㅇㄴㅏㅁ`, halfSingleReplace `ㄱㅏㅇㄴㅏㅁ` ) 

// .. functions .. 

function * rangeFromCodePoint([ from, to ]) { 
	for ( let p = from; p <= to; p += 1 ) { 
		yield String .fromCodePoint( p ) 
		} // -- for < to 
	} // -- range() 

function * pairs([ arrA, arrB ]) { 
	const genA = arrA[ Symbol .iterator ] () 
	const genB = arrB[ Symbol .iterator ] () 
	
	while ( true ) { 
		const valueA = genA .next() 
		const valueB = genB .next() 
		
		const pairFinished = valueA .done && valueB .done 
		if ( pairFinished ) 
			{ break } 
		
		yield [ valueA .value, valueB .value ] 
		} // -- while true 
	} // -- pairs() 

} /// 
// idea from https://twitter.com/znzinc01/status/1638480817772183552 
