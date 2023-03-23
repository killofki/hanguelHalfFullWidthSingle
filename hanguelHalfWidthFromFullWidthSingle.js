{ /// 

const hanAtThrees = [ ... rangeFromCodePoint([ 0x3161, 0x318f ]) ] 
const hanAtFs = [ ... rangeFromCodePoint([ 0xffda, 0xffdf ]) ] 

// 0x3030 0x314e 
// 0xffa0 0xffbe 

// 0xffbf 0xffc1 

// 0x314f 0x3154 
// 0xffc2 0xffc7 

// 0xffc8 0xffc9 

// 0x3155 0x315a 
// 0xffca 0xffcf 

// 0xffd0 0xffd1 

// 0x315b 0x3160 
// 0xffd2 0xffd7 

// 0xffd8 0xffd9 

// 0x3161 0x3163 
// 0xffda 0xffdc 

for ( const [ atT, atF ] of pairs([ hanAtThrees, hanAtFs ]) ) { 
	const atTn = `0x${ atT ?.codePointAt() ?.toString( 16 ) }` 
	const atFn = `0x${ atF ?.codePointAt() ?.toString( 16 ) }` 
	
	console .log( { atT, atF }, { atTn, atFn } ) 
	} // -- for of pairs 

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
