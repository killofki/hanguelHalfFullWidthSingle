{ /// 

const nameFromNToNCatcher 
	= noTabReg ` 
		\s*(?<name>\S+) 
		\s*(?<fromN>(?=\d)\S+) 
		\s*(?<toN>(?=\d)\S+)? 
		\s*(?=[^\s\d]|$) 
		` // -- noTabReg 
	.flag `gy` 
	// -- nameFromNToNCatcher 

const getCatchOrder = groups => 
	( rawValue 
		`(?<${ groups .name 
		}>[\u{${ Number( groups .fromN ) .toString `16` 
		}}-\u{${ Number( groups .toN ) .toString `16` 
		}}])` // -- rawValue 
	) // -- getCatchOrder() 

const codeByTo = ( code, by, to ) => { 
	const codePoint = code .codePointAt() - Number( by ) + Number( to ) 
	
	return String .fromCodePoint( codePoint ) 
	} // -- codeByTo 

// .. functions for outer hoisting .. 

function hanguelFHPatcher( ... ar ) { 
	const order = rawValue( ... ar ) 
	
	const [ fOrder, hOrder ] = order .matchAll( nameFromNToNCatcher ) 
	const fGroups = fOrder .groups 
	const hGroups = hOrder .groups 
	
	const fCatchOrder = getCatchOrder( fGroups ) 
	const hCatchOrder = getCatchOrder( hGroups ) 
	const catcher = RegExp( `${ fCatchOrder }|${ hCatchOrder }`, 'u' ) 
	
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
	} // -- hanguelFHPatcher() 

function noTabReg( ... ar ) { 
	const order = rawValue( ... ar ) 
	const regOrder = order .replace( /\s+/g, '' ) 
	
	const reg = RegExp( regOrder ) 
	reg .flag = ( ... flagAr ) => { 
		const flagOrder = rawValue( ... flagAr ) 
		return RegExp( regOrder, flagOrder ) 
		} // -- flag() 
	
	return reg 
	} // -- noTabReg() 

function rawValue( ...ar ) { 
	const [ rawo ] = ar 
	return rawo ?.raw ? String .raw( ... ar ) : rawo 
	} // -- rawValue() 

} /// 
