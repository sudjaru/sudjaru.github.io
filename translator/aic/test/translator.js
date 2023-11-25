var lua_script = (function() {
  var tmp;
  var G = lua_newtable2(lua_core);
  for (var i in lua_libs) {
    G.str[i] = lua_newtable2(lua_libs[i]);
  }
  G.str['arg'] = lua_newtable();
  G.str['_G'] = G;
  G.str['module'] = function (name) {
    lua_createmodule(G, name, slice(arguments, 1));
  };
  G.str['require'] = function (name) {
    lua_require(G, name);
  };
  G.str['package'].str['seeall'] = function (module) {
    if (!module.metatable) {
      module.metatable = lua_newtable();
    }
    module.metatable.str['__index'] = G;
  };
  {
    var _ngramMapping_1 = lua_newtable([], "sud", "A", "ash", "B", "the", "C", "and", "D", "tha", "E", "ent", "F", "ing", "G", "ion", "H", "tio", "I", "has", "J", "was", "K", "th", "L", "in", "M", "en", "N", "nt", "O", "ru", "P", "an", "Q", "am", "R", "is", "S", "it", "T", "de", "U", "te", "V", "ar", "W", "en", "X", "ed", "Y", "on", "Z");
    G.str['compressText'] = (function (_inputText) {
      var tmp;
      _inputText = lua_tablegetcall(G.str['string'], 'lower', [_inputText])[0];
      var _result_2 = "";
      var _i_2 = 1;
      while (lua_lte(_i_2, lua_len(_inputText))) {
        var _found_3 = false;
        tmp = lua_call(G.str['pairs'], [_ngramMapping_1]);
        var f_4 = tmp[0], s_4 = tmp[1], var_4 = tmp[2];
        while ((tmp = lua_call(f_4, [s_4, var_4]))[0] != null) {
          var_4 = tmp[0];
          var _ngram_4 = var_4, _replacement_4 = tmp[1];
          tmp = null;
          var _trigram_5 = lua_tablegetcall(G.str['string'], 'sub', [_inputText, _i_2, lua_add(_i_2, 2)])[0];
          if (lua_eq(_trigram_5, _ngram_4)) {
            _result_2 = lua_concat(_result_2, _replacement_4);
            _i_2 = lua_add(_i_2, 3);
            _found_3 = true;
            break;
          }
        }
        tmp = null;
        if (lua_not(_found_3)) {
          tmp = lua_call(G.str['pairs'], [_ngramMapping_1]);
          var f_8 = tmp[0], s_8 = tmp[1], var_8 = tmp[2];
          while ((tmp = lua_call(f_8, [s_8, var_8]))[0] != null) {
            var_8 = tmp[0];
            var _ngram_8 = var_8, _replacement_8 = tmp[1];
            tmp = null;
            var _bigram_9 = lua_tablegetcall(G.str['string'], 'sub', [_inputText, _i_2, lua_add(_i_2, 1)])[0];
            if (lua_eq(_bigram_9, _ngram_8)) {
              _result_2 = lua_concat(_result_2, _replacement_8);
              _i_2 = lua_add(_i_2, 2);
              break;
            }
          }
          tmp = null;
        }
        if (lua_not(_found_3)) {
          _result_2 = lua_concat(_result_2, lua_tablegetcall(G.str['string'], 'sub', [_inputText, _i_2, _i_2])[0]);
          _i_2 = lua_add(_i_2, 1);
        }
      }
      return [_result_2];
      return [];
    })
    G.str['decompressText'] = (function (_inputText) {
      var tmp;
      var _result_12 = "";
      var _i_12 = 1;
      while (lua_lte(_i_12, lua_len(_inputText))) {
        var _found_13 = false;
        tmp = lua_call(G.str['pairs'], [_ngramMapping_1]);
        var f_14 = tmp[0], s_14 = tmp[1], var_14 = tmp[2];
        while ((tmp = lua_call(f_14, [s_14, var_14]))[0] != null) {
          var_14 = tmp[0];
          var _ngram_14 = var_14, _replacement_14 = tmp[1];
          tmp = null;
          if (lua_eq(lua_tablegetcall(G.str['string'], 'sub', [_inputText, _i_12, _i_12])[0], _replacement_14)) {
            _result_12 = lua_concat(_result_12, _ngram_14);
            _i_12 = lua_add(_i_12, 1);
            _found_13 = true;
            break;
          }
        }
        tmp = null;
        if (lua_not(_found_13)) {
          tmp = lua_call(G.str['pairs'], [_ngramMapping_1]);
          var f_18 = tmp[0], s_18 = tmp[1], var_18 = tmp[2];
          while ((tmp = lua_call(f_18, [s_18, var_18]))[0] != null) {
            var_18 = tmp[0];
            var _ngram_18 = var_18, _replacement_18 = tmp[1];
            tmp = null;
            if (lua_eq(lua_tablegetcall(G.str['string'], 'sub', [_inputText, _i_12, lua_add(_i_12, 1)])[0], _replacement_18)) {
              _result_12 = lua_concat(_result_12, _ngram_18);
              _i_12 = lua_add(_i_12, 2);
              break;
            }
          }
          tmp = null;
        }
        if (lua_not(_found_13)) {
          _result_12 = lua_concat(_result_12, lua_tablegetcall(G.str['string'], 'sub', [_inputText, _i_12, _i_12])[0]);
          _i_12 = lua_add(_i_12, 1);
        }
      }
      return [_result_12];
      return [];
    })
    G.str['shuffleText'] = (function (_inputText, _seed) {
      var tmp;
      lua_tablegetcall(G.str['math'], 'randomseed', [_seed]);
      var _charTable_22 = lua_newtable();
      var _numTable_22 = lua_newtable();
      var _shuffleTable_22 = lua_newtable();
      var _resultTable_22 = lua_newtable();
      tmp = lua_mcall(_inputText, 'gmatch', ["."]);
      var f_23 = tmp[0], s_23 = tmp[1], var_23 = tmp[2];
      tmp = null;
      while ((var_23 = lua_call(f_23, [s_23, var_23])[0]) != null) {
        var _char_23 = var_23;
        lua_tablegetcall(G.str['table'], 'insert', [_charTable_22, _char_23]);
        lua_tablegetcall(G.str['table'], 'insert', [_numTable_22, lua_len(_charTable_22)]);
        lua_tablegetcall(G.str['table'], 'insert', [_shuffleTable_22, 0]);
      }
      var var_25 = 1, stop_25 = lua_assertfloat(lua_len(_numTable_22));
      for (; var_25 <= stop_25; var_25++) {
        var _i_25 = var_25;
        var _currentNum_26 = lua_tableget(_numTable_22, _i_25);
        if (lua_eq(lua_tableget(_shuffleTable_22, _i_25), 0)) {
          var _newPos_27;
          do {
            _newPos_27 = lua_tablegetcall(G.str['math'], 'random', [1, lua_len(_numTable_22)])[0];
          } while (!(lua_eq(lua_tableget(_shuffleTable_22, _newPos_27), 0)));
          lua_tableset(_shuffleTable_22, _i_25, lua_tableget(_numTable_22, _newPos_27));
          lua_tableset(_shuffleTable_22, _newPos_27, _currentNum_26);
        }
      }
      var var_29 = 1, stop_29 = lua_assertfloat(lua_len(_shuffleTable_22));
      for (; var_29 <= stop_29; var_29++) {
        var _i_29 = var_29;
        var _charIndex_30 = lua_tableget(_shuffleTable_22, _i_29);
        var _char_30 = lua_tableget(_charTable_22, _charIndex_30);
        lua_tablegetcall(G.str['table'], 'insert', [_resultTable_22, _char_30]);
      }
      var _resultText_22 = lua_tablegetcall(G.str['table'], 'concat', [_resultTable_22])[0];
      return [_resultText_22];
      return [];
    })
    G.str['stringToNumber'] = (function (_inputString) {
      var tmp;
      var _encodedString_31 = "";
      var var_32 = 1, stop_32 = lua_assertfloat(lua_len(_inputString));
      for (; var_32 <= stop_32; var_32++) {
        var _i_32 = var_32;
        var _charCode_33 = lua_tablegetcall(G.str['string'], 'byte', [_inputString, _i_32])[0];
        _encodedString_31 = lua_concat(_encodedString_31, lua_call(G.str['tostring'], [_charCode_33])[0]);
      }
      return [_encodedString_31];
      return [];
    })
    G.str['spacesToEquals'] = (function (_inputString) {
      var tmp;
      var _swappedString_34 = lua_tablegetcall(G.str['string'], 'gsub', [_inputString, " ", "="])[0];
      return [_swappedString_34];
      return [];
    })
    G.str['equalsToSpaces'] = (function (_inputString) {
      var tmp;
      var _swappedString_35 = lua_tablegetcall(G.str['string'], 'gsub', [_inputString, "=", " "])[0];
      return [_swappedString_35];
      return [];
    })
    var _text_1 = "unulgn=JgLie===ZeUawin=gzQotr=o";
    var _passphrase_1 = "Sudjaru";
    var _seed_1 = lua_call(G.str['stringToNumber'], [_passphrase_1])[0];
    var _translatedText_1 = lua_call(G.str['spacesToEquals'], lua_call(G.str['shuffleText'], [lua_call(G.str['compressText'], [_text_1])[0], _seed_1]))[0];
    var _decipheredText_1 = lua_call(G.str['equalsToSpaces'], lua_call(G.str['decompressText'], lua_call(G.str['shuffleText'], [_text_1, _seed_1])))[0];
    lua_call(G.str['print'], [lua_concat("Inputted Text: ", _text_1)]);
    lua_call(G.str['print'], [lua_concat("Translated Text: ", _translatedText_1)]);
    lua_call(G.str['print'], [lua_concat("Deciphered Text: ", _decipheredText_1)]);
  };
  return [G];
})()[0];
