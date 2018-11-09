function get_random_int(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function fill_array(_number) {
    var new_array = new Array();
    for (var i = 0; i < _number; i++) {
        new_array.push(0);
    }
    return new_array;
}

var adjacency_matrix = 0; //матрица смежности
var temp_array_for_W = 0;
var dimension = 0; //размерность матрицы / количество вершин

function generate_graph(number_of_edges) {
    dimension = number_of_edges;
    var temp_array = 0;
    if (number_of_edges === 1) {
        // если вдруг кто-то захочет создать граф
        // для одного элемента
        adjacency_matrix = new Array();
        temp_array = new Array();
        temp_array.push(get_random_int(40, 100));
        adjacency_matrix.push(temp_array);
    } else {
        adjacency_matrix = new Array();
        for (var i = 0; i < dimension; i++) {
            temp_array = fill_array(dimension);
            adjacency_matrix.push(temp_array);
            var flag = true;
            if (i === 0) {
                continue;
            }
            // потому что нехер выносить одно создание   
            while (flag) {
                for (var j = 0; j < i; j++) {
                    var probability = get_random_int(0, 100);
                    if (probability % 7 === 0) {
                        var weight = get_random_int(40, 100);
                        adjacency_matrix[i][j] = weight;
                        adjacency_matrix[j][i] = weight;
                        flag = false;
                    }
                }

            }

        }
    }
}

var W = 0;
var P = 0;
var T = 0;
var pred = 0;
var Sum = 0;
var V = 0;
var way_V = 0;
var JSON_WAY_MD = 0;

function MD() {
    W = new Array();
    P = new Array(dimension);
    T = new Array(dimension);
    pred = new Array(dimension);
    JSON_WAY_MD = new Array();
    V = 0;
    for (var i = 0; i < dimension; i++) {
        W.push(adjacency_matrix[i].slice());
        // копируем матрицу смежности
    }
    for (var i = 0; i < dimension; i++) {
        for (var j = 0; j < i; j++) {
            if (i !== j && W[i][j] === 0) {
                W[i][j] = Infinity;
                W[j][i] = Infinity;
            }
        }
    }

    for (var i = 0; i < dimension; i++) {
        W[V][i] = Infinity;
        T[i] = Infinity;
        P[i] = Infinity;
    }

    pred[0] = 0;
    P[0] = 0;
    T[0] = Infinity;
    V = 0;

    
    // когда считается сумма 
    // нужно показывать какие мы вершины считаем
    // какие нет
    // все шаги нужно показать
    // нужно придумать как это реализовать
    do {
        var temp_JSON_WAY_MD = {};
        Sum = new Array(dimension);
        for (var i = 0; i < dimension; i++) {
            Sum[i] = P[V] + W[i][V];
            if (Sum[i] < T[i]) {
                pred[i] = V;
                T[i] = Sum[i];
            }
        }
        temp_JSON_WAY_MD['pred'] = pred.slice();
        var j = 0;
        j = T.indexOf(Math.min.apply(Math, T));
        P[j] = T[j];
        temp_JSON_WAY_MD['P[j]'] = P[j];
        temp_JSON_WAY_MD['P'] = P.slice();
        T[j] = Infinity;
        V = j;
        temp_JSON_WAY_MD['V'] = V;
        temp_JSON_WAY_MD['HI'] = true;
        for (var i = 0; i < dimension; i++) {
            W[V][i] = Infinity;
        }
        JSON_WAY_MD.push(temp_JSON_WAY_MD);
    }
    while (V !== (dimension - 1));

    var k = V;
    way_V = new Array();
    way_V.push(V);
    do {
        k = pred[k];
        way_V.push(k);
    } while (k !== 0);
    way_V = way_V.reverse();
    temp_op = {};
    temp_op['way_V'] = way_V.slice();
    temp_op['HI'] = false;
    JSON_WAY_MD.push(temp_op);

}

generate_graph(15);
MD();
console.log(adjacency_matrix);
console.log(W);
console.log(P);
console.log(pred);
console.log(V);
console.log(way_V);
console.log(JSON_WAY_MD);