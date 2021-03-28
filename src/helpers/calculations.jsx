import { max_squares } from './settings';

export const calculateSmallWinner = (squares) => {
    const lines = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export const calculateWinner = (squares) => {
    let sqrt = Math.sqrt(max_squares);

    for (let i = 1; i <= max_squares; i++) {
        let row = [i,i+1,i+2,i+3,i+4];
        if (squares[i] 
            && squares[i] === squares[row[1]]
            && squares[i] === squares[row[2]] 
            && squares[i] === squares[row[3]]
            && squares[i] === squares[row[4]])
        {
            return {winner: squares[i], squares: row};
        }
    }
    for (let i = 1; i <= max_squares; i++) {
        let col = [i,i+sqrt,i+sqrt*2,i+sqrt*3,i+sqrt*4];
        if (squares[i] 
            && squares[i] === squares[col[1]]
            && squares[i] === squares[col[2]] 
            && squares[i] === squares[col[3]]
            && squares[i] === squares[col[4]])
        {
            return {winner: squares[i], squares: col};
        }
    }
    for (let i = 1; i <= max_squares; i++) {
        let diag = [i,i+sqrt+1,i+sqrt*2+2,i+sqrt*3+3,i+sqrt*4+4];
        if (squares[i] 
            && squares[i] === squares[diag[1]]
            && squares[i] === squares[diag[2]] 
            && squares[i] === squares[diag[3]]
            && squares[i] === squares[diag[4]])
        {
            return {winner: squares[i], squares: diag};
        }
    }
    for (let i = 1; i <= max_squares; i++) {
        let diag = [i,i+sqrt-1,i+sqrt*2-2,i+sqrt*3-3,i+sqrt*4-4];
        if (squares[i] 
            && squares[i] === squares[diag[1]]
            && squares[i] === squares[diag[2]] 
            && squares[i] === squares[diag[3]]
            && squares[i] === squares[diag[4]])
        {
            return {winner: squares[i], squares: diag};
        }
    }
    return {winner: null, squares: []};

}

export const generateSquares = () => {

    let max_elements = 100;
    let sqrt = Math.sqrt(max_elements);

    let getNumber = (x,y) => {
        return Math.round((x-1)*sqrt+y); // Math.round allows for uneven max_elements
    }

    let all_pass = true;

    for (let i = 1; i <= max_elements; i++) {

        let should_be = i;
    
        console.log(i+' is in ');
        
        let Row = Math.ceil(i/sqrt);

        let remainder = i/sqrt - (Math.floor(i/sqrt));
        let Col = remainder ? Math.round(remainder * sqrt) : sqrt;

        console.log('Row: '+Row+' and Col: '+Col);
    
        let really_is = getNumber(Row, Col);

        console.log('In that row should be: '+really_is);
    
        if (should_be === really_is) {
            console.log('Correct')
        } else {
            console.log('Incorrect')
            all_pass = false;
        }

    }

    if (all_pass) console.log('ALL TESTS PASSED!');

}

export const getCoordinates = (square) => {

    let sqrt = Math.sqrt(max_squares);

    let Row = Math.ceil(square/sqrt);

    let remainder = square/sqrt - (Math.floor(square/sqrt));
    let Col = remainder ? Math.round(remainder * sqrt) : sqrt;

    return Row + 'x' + Col;
}