var $module$exports$output$stats$webrtcbinarystats$statsConfig$depr$$ = {size:70, version:1, name:"DEPR"}, $module$exports$output$stats$webrtcbinarystats$statsConfig$rtpv$$ = {size:80, version:3, name:"RTPV"}, $module$exports$output$stats$webrtcbinarystats$statsConfig$rtpa$$ = {size:48, version:1, name:"RTPA"}, $module$exports$output$stats$webrtcbinarystats$statsConfig$traa$$ = {size:88, version:1, name:"TRAA"}, $module$exports$output$stats$webrtcbinarystats$statsConfig$trav$$ = {size:44, version:1, 
name:"TRAV"}, $module$exports$output$stats$webrtcbinarystats$statsConfig$vfmd$$ = {size:12, version:1, name:"VFMD"}, $module$exports$output$stats$webrtcbinarystats$statsConfig$pfda$$ = {size:20, version:1, name:"PFDA"}, $module$exports$output$stats$webrtcbinarystats$statsConfig$none$$ = {size:0, version:1, name:""};
function $JSCompiler_StaticMethods_createWebSocket$$($JSCompiler_StaticMethods_createWebSocket$self$$, $reconnect$jscomp$1$$ = !1) {
  try {
    let $header$jscomp$2$$;
    $JSCompiler_StaticMethods_createWebSocket$self$$.url.includes("wss") && ($header$jscomp$2$$ = "x-nv-sessionid." + $JSCompiler_StaticMethods_createWebSocket$self$$.sessionId, $JSCompiler_StaticMethods_createWebSocket$self$$.accessToken && ($header$jscomp$2$$ += "-Authorization.Bearer-" + $JSCompiler_StaticMethods_createWebSocket$self$$.accessToken));
    let $websocketUrl$$ = $JSCompiler_StaticMethods_createWebSocket$self$$.url;
    $reconnect$jscomp$1$$ && ($websocketUrl$$ += "&reconnect=1");
    let $localWs$$ = new WebSocket($websocketUrl$$, $header$jscomp$2$$);
    $localWs$$.onopen = () => {
      $JSCompiler_StaticMethods_createWebSocket$self$$.$h$("{aaf44dc}");
      $JSCompiler_StaticMethods_createWebSocket$self$$.$l$.$openHandler$();
      if ($localWs$$ === $JSCompiler_StaticMethods_createWebSocket$self$$.$g$) {
        for (const $pendingMessage$$ of $JSCompiler_StaticMethods_createWebSocket$self$$.$j$) {
          $pendingMessage$$.stats ? $localWs$$.send($pendingMessage$$.stats) : $localWs$$.send(JSON.stringify($pendingMessage$$));
        }
        for (const $pendingMessage$jscomp$1$$ of $JSCompiler_StaticMethods_createWebSocket$self$$.$o$) {
          $JSCompiler_StaticMethods_sendOnWsReliablyIfNeeded$$($JSCompiler_StaticMethods_createWebSocket$self$$, $pendingMessage$jscomp$1$$);
        }
        $JSCompiler_StaticMethods_createWebSocket$self$$.$o$ = [];
      }
    };
    $localWs$$.onclose = $event$jscomp$8$$ => {
      $JSCompiler_StaticMethods_createWebSocket$self$$.$h$("{7a09ad8}");
      $JSCompiler_StaticMethods_createWebSocket$self$$.$l$.$closeHandler$({error:$JSCompiler_StaticMethods_createWebSocket$self$$.$s$, code:$event$jscomp$8$$.code, reason:$event$jscomp$8$$.reason, wasClean:$event$jscomp$8$$.wasClean});
      $localWs$$ === $JSCompiler_StaticMethods_createWebSocket$self$$.$g$ && ($JSCompiler_StaticMethods_createWebSocket$self$$.$g$ = void 0);
      $JSCompiler_StaticMethods_createWebSocket$self$$.$s$ = !1;
    };
    $localWs$$.onerror = () => {
      $JSCompiler_StaticMethods_createWebSocket$self$$.$h$("{418a180}");
      $JSCompiler_StaticMethods_createWebSocket$self$$.$s$ = !0;
    };
    $localWs$$.onmessage = $ack$jscomp$inline_12_event$jscomp$10_wsMsg$$ => {
      $ack$jscomp$inline_12_event$jscomp$10_wsMsg$$ = JSON.parse($ack$jscomp$inline_12_event$jscomp$10_wsMsg$$.data);
      $JSCompiler_StaticMethods_createWebSocket$self$$.serverSupportsAck && $JSCompiler_StaticMethods_setHeartBeatTimeout$$($JSCompiler_StaticMethods_createWebSocket$self$$);
      void 0 === $ack$jscomp$inline_12_event$jscomp$10_wsMsg$$.ackid || $JSCompiler_StaticMethods_createWebSocket$self$$.serverSupportsAck || ($JSCompiler_StaticMethods_createWebSocket$self$$.serverSupportsAck = !0, $JSCompiler_StaticMethods_createWebSocket$self$$.$h$("{523f5b9}"), $JSCompiler_StaticMethods_setHeartBeatTimeout$$($JSCompiler_StaticMethods_createWebSocket$self$$));
      if (!$ack$jscomp$inline_12_event$jscomp$10_wsMsg$$.hb) {
        if ($JSCompiler_StaticMethods_createWebSocket$self$$.serverSupportsAck) {
          if (void 0 !== $ack$jscomp$inline_12_event$jscomp$10_wsMsg$$.ack) {
            var $ack$jscomp$inline_8$$ = $ack$jscomp$inline_12_event$jscomp$10_wsMsg$$.ack;
            for (let $i$jscomp$inline_9$$ = $JSCompiler_StaticMethods_createWebSocket$self$$.$j$.length - 1; 0 <= $i$jscomp$inline_9$$; $i$jscomp$inline_9$$--) {
              $JSCompiler_StaticMethods_createWebSocket$self$$.$j$[$i$jscomp$inline_9$$].ackid <= $ack$jscomp$inline_8$$ && $JSCompiler_StaticMethods_createWebSocket$self$$.$j$.splice($i$jscomp$inline_9$$, 1);
            }
          }
          void 0 !== $ack$jscomp$inline_12_event$jscomp$10_wsMsg$$.ackid ? ($JSCompiler_StaticMethods_createWebSocket$self$$.maxReceivedAckId < $ack$jscomp$inline_12_event$jscomp$10_wsMsg$$.ackid && ($JSCompiler_StaticMethods_createWebSocket$self$$.$l$.$messageHandler$($ack$jscomp$inline_12_event$jscomp$10_wsMsg$$), $JSCompiler_StaticMethods_createWebSocket$self$$.maxReceivedAckId = $ack$jscomp$inline_12_event$jscomp$10_wsMsg$$.ackid), $JSCompiler_StaticMethods_createWebSocket$self$$.$g$ && ($ack$jscomp$inline_12_event$jscomp$10_wsMsg$$ = 
          JSON.stringify({ack:$JSCompiler_StaticMethods_createWebSocket$self$$.maxReceivedAckId}), $JSCompiler_StaticMethods_createWebSocket$self$$.$h$("{903be10}" + $ack$jscomp$inline_12_event$jscomp$10_wsMsg$$), $JSCompiler_StaticMethods_createWebSocket$self$$.$g$.send($ack$jscomp$inline_12_event$jscomp$10_wsMsg$$))) : void 0 === $ack$jscomp$inline_12_event$jscomp$10_wsMsg$$.ack && $JSCompiler_StaticMethods_createWebSocket$self$$.$l$.$messageHandler$($ack$jscomp$inline_12_event$jscomp$10_wsMsg$$);
        } else {
          $JSCompiler_StaticMethods_createWebSocket$self$$.$l$.$messageHandler$($ack$jscomp$inline_12_event$jscomp$10_wsMsg$$);
        }
      }
    };
    $JSCompiler_StaticMethods_createWebSocket$self$$.$g$ = $localWs$$;
  } catch ($exp$$) {
    $JSCompiler_StaticMethods_createWebSocket$self$$.$g$ = void 0, $JSCompiler_StaticMethods_createWebSocket$self$$.$u$("WebSocket creation exception: " + $exp$$);
  }
}
function $JSCompiler_StaticMethods_clearHeartBeatTimeout$$($JSCompiler_StaticMethods_clearHeartBeatTimeout$self$$) {
  0 !== $JSCompiler_StaticMethods_clearHeartBeatTimeout$self$$.$m$ && (self.clearTimeout($JSCompiler_StaticMethods_clearHeartBeatTimeout$self$$.$m$), $JSCompiler_StaticMethods_clearHeartBeatTimeout$self$$.$m$ = 0);
}
function $JSCompiler_StaticMethods_setHeartBeatTimeout$$($JSCompiler_StaticMethods_setHeartBeatTimeout$self$$) {
  $JSCompiler_StaticMethods_clearHeartBeatTimeout$$($JSCompiler_StaticMethods_setHeartBeatTimeout$self$$);
  $JSCompiler_StaticMethods_setHeartBeatTimeout$self$$.$m$ = self.setTimeout(() => {
    var $_a$jscomp$inline_15$$;
    $JSCompiler_StaticMethods_setHeartBeatTimeout$self$$.$h$("{6c3505a}" + (null === ($_a$jscomp$inline_15$$ = $JSCompiler_StaticMethods_setHeartBeatTimeout$self$$.$g$) || void 0 === $_a$jscomp$inline_15$$ ? void 0 : $_a$jscomp$inline_15$$.readyState));
    $JSCompiler_StaticMethods_setHeartBeatTimeout$self$$.$g$ || $JSCompiler_StaticMethods_createWebSocket$$($JSCompiler_StaticMethods_setHeartBeatTimeout$self$$, !0);
    $JSCompiler_StaticMethods_setHeartBeatTimeout$$($JSCompiler_StaticMethods_setHeartBeatTimeout$self$$);
  }, 3000);
}
function $JSCompiler_StaticMethods_sendOnWsReliablyIfNeeded$$($JSCompiler_StaticMethods_sendOnWsReliablyIfNeeded$self$$, $data$jscomp$81$$) {
  void 0 !== $data$jscomp$81$$.ackid && $JSCompiler_StaticMethods_sendOnWsReliablyIfNeeded$self$$.serverSupportsAck && void 0 !== $data$jscomp$81$$.ackid && $JSCompiler_StaticMethods_sendOnWsReliablyIfNeeded$self$$.$j$.push($data$jscomp$81$$);
  $JSCompiler_StaticMethods_sendOnWsReliablyIfNeeded$self$$.$g$ && ($data$jscomp$81$$.stats ? $JSCompiler_StaticMethods_sendOnWsReliablyIfNeeded$self$$.$g$.send($data$jscomp$81$$.stats) : $JSCompiler_StaticMethods_sendOnWsReliablyIfNeeded$self$$.$g$.send(JSON.stringify($data$jscomp$81$$)));
}
var $module$exports$output$websocketimpl$WebSocketImpl$$ = class {
  constructor() {
    var $JSCompiler_object_inline_wsHandler_68$$ = {$messageHandler$:$module$contents$output$ragnarokworker_wsMessageHandler$$, $openHandler$:$module$contents$output$ragnarokworker_wsOpenHandler$$, $closeHandler$:$module$contents$output$ragnarokworker_wsCloseHandler$$, $openingHandler$:$module$contents$output$ragnarokworker_wsOpeningHandler$$}, $JSCompiler_object_inline_info_70$$ = $module$contents$output$ragnarokworker_workerLogger$$, $JSCompiler_object_inline_exception_71$$ = $module$contents$output$ragnarokworker_workerException$$;
    this.sessionId = $module$contents$output$ragnarokworker_sessionId$$;
    this.accessToken = "";
    this.serverSupportsAck = this.$s$ = !1;
    this.$j$ = [];
    this.$o$ = [];
    this.maxReceivedAckId = this.$m$ = 0;
    this.url = "";
    this.$h$ = $JSCompiler_object_inline_info_70$$;
    this.$u$ = $JSCompiler_object_inline_exception_71$$;
    this.$l$ = $JSCompiler_object_inline_wsHandler_68$$;
  }
  initialize($url$jscomp$22$$, $maxReceivedAckId$$, $serverSupportsAck$$, $reconnect$$ = !1) {
    this.url = $url$jscomp$22$$;
    this.maxReceivedAckId = $maxReceivedAckId$$;
    this.serverSupportsAck = $serverSupportsAck$$;
    $JSCompiler_StaticMethods_createWebSocket$$(this, $reconnect$$);
    this.$h$("{f4b05a4}");
  }
  uninitialize($closeCode$$) {
    var $_a$$;
    this.maxReceivedAckId = 0;
    this.serverSupportsAck = !1;
    this.$j$ = [];
    this.$o$ = [];
    $JSCompiler_StaticMethods_clearHeartBeatTimeout$$(this);
    null === ($_a$$ = this.$g$) || void 0 === $_a$$ ? void 0 : $_a$$.close($closeCode$$);
    this.$h$("{986b258}" + $closeCode$$);
  }
  reconnect() {
    $JSCompiler_StaticMethods_createWebSocket$$(this, !0);
  }
  send($data$jscomp$82$$) {
    this.serverSupportsAck || this.$g$ || $JSCompiler_StaticMethods_createWebSocket$$(this, !0);
    this.$g$ && this.$g$.readyState === WebSocket.OPEN ? $JSCompiler_StaticMethods_sendOnWsReliablyIfNeeded$$(this, $data$jscomp$82$$) : this.$o$.push($data$jscomp$82$$);
  }
};
const $module$contents$output$ragnarokworker_ctx$$ = self;
let $module$contents$output$ragnarokworker_perfs$$ = [], $module$contents$output$ragnarokworker_clientEvents$$ = [];
function $JSCompiler_StaticMethods_addReport$$($report$$) {
  var $JSCompiler_StaticMethods_addReport$self$$ = $module$contents$output$ragnarokworker_webrtcBinaryStats$$;
  let $buffer$jscomp$16$$ = $JSCompiler_StaticMethods_addReport$self$$.$g$.get($report$$.type);
  $buffer$jscomp$16$$ || ($buffer$jscomp$16$$ = [], $JSCompiler_StaticMethods_addReport$self$$.$g$.set($report$$.type, $buffer$jscomp$16$$));
  for (const $element$jscomp$8$$ of $report$$.stats) {
    $buffer$jscomp$16$$.push($element$jscomp$8$$);
  }
}
function $JSCompiler_StaticMethods_getStatsConfig$$($type$jscomp$158$$) {
  switch($type$jscomp$158$$) {
    case 0:
      return $module$exports$output$stats$webrtcbinarystats$statsConfig$depr$$;
    case 1:
      return $module$exports$output$stats$webrtcbinarystats$statsConfig$rtpv$$;
    case 2:
      return $module$exports$output$stats$webrtcbinarystats$statsConfig$rtpa$$;
    case 3:
      return $module$exports$output$stats$webrtcbinarystats$statsConfig$trav$$;
    case 4:
      return $module$exports$output$stats$webrtcbinarystats$statsConfig$traa$$;
    case 5:
      return $module$exports$output$stats$webrtcbinarystats$statsConfig$vfmd$$;
    case 6:
      return $module$exports$output$stats$webrtcbinarystats$statsConfig$pfda$$;
    default:
      return $module$exports$output$stats$webrtcbinarystats$statsConfig$none$$;
  }
}
let $module$contents$output$ragnarokworker_webrtcBinaryStats$$ = new class {
  constructor() {
    this.$g$ = new Map();
    this.$g$.clear();
  }
  size() {
    let $totalSize$$ = 0;
    for (let [, $array__tsickle_destructured_2$$] of this.$g$) {
      let $array$jscomp$6$$ = $array__tsickle_destructured_2$$;
      for (let $value$jscomp$91$$ of $array$jscomp$6$$) {
        $totalSize$$ += $value$jscomp$91$$.byteLength;
      }
    }
    return $totalSize$$ += 9 * this.$g$.size;
  }
  write($dest$jscomp$1$$, $arr$jscomp$inline_38_arrayBuffer_source$jscomp$inline_34_startOffset$$) {
    var $elementCount$jscomp$inline_26_offset$jscomp$26_offset$jscomp$inline_35$$ = $arr$jscomp$inline_38_arrayBuffer_source$jscomp$inline_34_startOffset$$;
    for (let [$key__tsickle_destructured_3$$, $arrayBuffer__tsickle_destructured_4$$] of this.$g$) {
      $arr$jscomp$inline_38_arrayBuffer_source$jscomp$inline_34_startOffset$$ = $arrayBuffer__tsickle_destructured_4$$;
      var $JSCompiler_temp_const$jscomp$3_JSCompiler_temp_const$jscomp$5$$ = $elementCount$jscomp$inline_26_offset$jscomp$26_offset$jscomp$inline_35$$, $dest$jscomp$inline_33_offset$jscomp$inline_24$$ = $elementCount$jscomp$inline_26_offset$jscomp$26_offset$jscomp$inline_35$$;
      $elementCount$jscomp$inline_26_offset$jscomp$26_offset$jscomp$inline_35$$ = $arr$jscomp$inline_38_arrayBuffer_source$jscomp$inline_34_startOffset$$.length;
      var $byteCount$jscomp$inline_36_config$jscomp$inline_27$$ = $JSCompiler_StaticMethods_getStatsConfig$$($key__tsickle_destructured_3$$);
      let $chunkType$jscomp$inline_28$$ = $byteCount$jscomp$inline_36_config$jscomp$inline_27$$.name, $dataBufferView$jscomp$inline_29$$ = new DataView($dest$jscomp$1$$.buffer);
      for (let $i$jscomp$inline_30$$ = 0; 4 > $i$jscomp$inline_30$$; $i$jscomp$inline_30$$++) {
        $dataBufferView$jscomp$inline_29$$.setUint8($dest$jscomp$inline_33_offset$jscomp$inline_24$$ + $i$jscomp$inline_30$$, $chunkType$jscomp$inline_28$$.charCodeAt($i$jscomp$inline_30$$));
      }
      $dataBufferView$jscomp$inline_29$$.setUint8($dest$jscomp$inline_33_offset$jscomp$inline_24$$ + 4, $byteCount$jscomp$inline_36_config$jscomp$inline_27$$.version);
      $dataBufferView$jscomp$inline_29$$.setUint16($dest$jscomp$inline_33_offset$jscomp$inline_24$$ + 5, $elementCount$jscomp$inline_26_offset$jscomp$26_offset$jscomp$inline_35$$, !0);
      $dataBufferView$jscomp$inline_29$$.setUint16($dest$jscomp$inline_33_offset$jscomp$inline_24$$ + 7, $byteCount$jscomp$inline_36_config$jscomp$inline_27$$.size, !0);
      $JSCompiler_temp_const$jscomp$3_JSCompiler_temp_const$jscomp$5$$ = $elementCount$jscomp$inline_26_offset$jscomp$26_offset$jscomp$inline_35$$ = $JSCompiler_temp_const$jscomp$3_JSCompiler_temp_const$jscomp$5$$ + 9;
      $dest$jscomp$inline_33_offset$jscomp$inline_24$$ = $dest$jscomp$1$$;
      $byteCount$jscomp$inline_36_config$jscomp$inline_27$$ = 0;
      for (let $value$jscomp$inline_37$$ of $arr$jscomp$inline_38_arrayBuffer_source$jscomp$inline_34_startOffset$$) {
        $arr$jscomp$inline_38_arrayBuffer_source$jscomp$inline_34_startOffset$$ = new Uint8Array($value$jscomp$inline_37$$), $dest$jscomp$inline_33_offset$jscomp$inline_24$$.set($arr$jscomp$inline_38_arrayBuffer_source$jscomp$inline_34_startOffset$$, $elementCount$jscomp$inline_26_offset$jscomp$26_offset$jscomp$inline_35$$ + $byteCount$jscomp$inline_36_config$jscomp$inline_27$$), $byteCount$jscomp$inline_36_config$jscomp$inline_27$$ += $value$jscomp$inline_37$$.byteLength;
      }
      $elementCount$jscomp$inline_26_offset$jscomp$26_offset$jscomp$inline_35$$ = $JSCompiler_temp_const$jscomp$3_JSCompiler_temp_const$jscomp$5$$ + $byteCount$jscomp$inline_36_config$jscomp$inline_27$$;
    }
    return $elementCount$jscomp$inline_26_offset$jscomp$26_offset$jscomp$inline_35$$;
  }
}(), $module$contents$output$ragnarokworker_sessionId$$ = "", $module$contents$output$ragnarokworker_url$$ = "", $module$contents$output$ragnarokworker_statsHeaderObj$$ = null, $module$contents$output$ragnarokworker_webSocket$$ = void 0, $module$contents$output$ragnarokworker_uploadIntervalId$$ = 0, $module$contents$output$ragnarokworker_streamingQuality$$ = [], $module$contents$output$ragnarokworker_mtbDurations$$ = [], $module$contents$output$ragnarokworker_inputChannelStats$$ = [], $module$contents$output$ragnarokworker_garbageCollectionStats$$ = 
[], $module$contents$output$ragnarokworker_serverSupportsAck$$ = !1, $module$contents$output$ragnarokworker_nextAckIdToSendForStats$$ = 0;
function $module$contents$output$ragnarokworker_workerLogger$$($logmsg$$) {
  $module$contents$output$ragnarokworker_ctx$$.postMessage({log:$logmsg$$});
}
function $module$contents$output$ragnarokworker_workerException$$($expmsg$$) {
  $module$contents$output$ragnarokworker_ctx$$.postMessage({exception:$expmsg$$});
}
function $module$contents$output$ragnarokworker_clearCachedData$$() {
  $module$contents$output$ragnarokworker_perfs$$ = [];
  $module$contents$output$ragnarokworker_clientEvents$$ = [];
  $module$contents$output$ragnarokworker_webrtcBinaryStats$$.$g$.clear();
  $module$contents$output$ragnarokworker_streamingQuality$$ = [];
  $module$contents$output$ragnarokworker_mtbDurations$$ = [];
  $module$contents$output$ragnarokworker_inputChannelStats$$ = [];
  $module$contents$output$ragnarokworker_garbageCollectionStats$$ = [];
}
function $module$contents$output$ragnarokworker_writeChunkHeader$$($dataBufferView$jscomp$1$$, $offset$jscomp$29$$, $chunkType$jscomp$1$$, $version$jscomp$4$$, $elementCount$jscomp$1$$, $sizeOfElement$$) {
  for (let $i$jscomp$5$$ = 0; 4 > $i$jscomp$5$$; $i$jscomp$5$$++) {
    $dataBufferView$jscomp$1$$.setUint8($offset$jscomp$29$$ + $i$jscomp$5$$, $chunkType$jscomp$1$$.charCodeAt($i$jscomp$5$$));
  }
  $dataBufferView$jscomp$1$$.setUint8($offset$jscomp$29$$ + 4, $version$jscomp$4$$);
  $dataBufferView$jscomp$1$$.setUint16($offset$jscomp$29$$ + 5, $elementCount$jscomp$1$$, !0);
  $dataBufferView$jscomp$1$$.setUint16($offset$jscomp$29$$ + 7, $sizeOfElement$$, !0);
}
function $module$contents$output$ragnarokworker_asInt32$$($num$jscomp$6$$) {
  return 0 > $num$jscomp$6$$ ? Math.max($num$jscomp$6$$, -2147483648) : Math.min($num$jscomp$6$$, 4294967295);
}
function $module$contents$output$ragnarokworker_uploadData$$() {
  if (($module$contents$output$ragnarokworker_perfs$$.length || $module$contents$output$ragnarokworker_clientEvents$$.length) && $module$contents$output$ragnarokworker_statsHeaderObj$$) {
    try {
      $module$contents$output$ragnarokworker_statsHeaderObj$$.ackid = $module$contents$output$ragnarokworker_serverSupportsAck$$ ? $module$contents$output$ragnarokworker_nextAckIdToSendForStats$$ : void 0;
      var $header$jscomp$3_offset$jscomp$36$$ = JSON.stringify($module$contents$output$ragnarokworker_statsHeaderObj$$);
      $i$jscomp$12_len$$ = $header$jscomp$3_offset$jscomp$36$$.length;
      $i$jscomp$inline_48_offset$jscomp$inline_43_totalLen$$ = $i$jscomp$12_len$$ + 2;
      var $headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$ = new ArrayBuffer($i$jscomp$inline_48_offset$jscomp$inline_43_totalLen$$);
      const $headerView$$ = new DataView($headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$);
      $headerView$$.setUint16(0, $i$jscomp$12_len$$);
      for (var $i$jscomp$12_len$$ = 2; $i$jscomp$12_len$$ < $i$jscomp$inline_48_offset$jscomp$inline_43_totalLen$$; ++$i$jscomp$12_len$$) {
        $headerView$$.setUint8($i$jscomp$12_len$$, $header$jscomp$3_offset$jscomp$36$$.charCodeAt($i$jscomp$12_len$$ - 2));
      }
      $dataBufferView$jscomp$inline_42_headerBufferBytes_offset$jscomp$inline_47$$ = new Uint8Array($headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$);
      $dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$ = 13 * $module$contents$output$ragnarokworker_perfs$$.length;
      $dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$ = 72 * $module$contents$output$ragnarokworker_clientEvents$$.length;
      $dataBufferView$jscomp$inline_56_offset$jscomp$inline_61_sqEventsDataSize$$ = 12 * $module$contents$output$ragnarokworker_streamingQuality$$.length;
      $dataBufferView$jscomp$inline_60_durationDataSize_i$jscomp$inline_66$$ = 10 * $module$contents$output$ragnarokworker_mtbDurations$$.length;
      $dataBufferView$jscomp$inline_64_inputChannelDataSize$$ = 12 * $module$contents$output$ragnarokworker_inputChannelStats$$.length;
      const $garbageCollectionDataSize$$ = 16 * $module$contents$output$ragnarokworker_garbageCollectionStats$$.length;
      let $totalSize$jscomp$1$$ = 9 + $dataBufferView$jscomp$inline_42_headerBufferBytes_offset$jscomp$inline_47$$.length;
      $dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$ && ($totalSize$jscomp$1$$ += 9 + $dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$);
      $dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$ && ($totalSize$jscomp$1$$ += 9 + $dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$);
      $dataBufferView$jscomp$inline_56_offset$jscomp$inline_61_sqEventsDataSize$$ && ($totalSize$jscomp$1$$ += 9 + $dataBufferView$jscomp$inline_56_offset$jscomp$inline_61_sqEventsDataSize$$);
      $dataBufferView$jscomp$inline_60_durationDataSize_i$jscomp$inline_66$$ && ($totalSize$jscomp$1$$ += 9 + $dataBufferView$jscomp$inline_60_durationDataSize_i$jscomp$inline_66$$);
      $dataBufferView$jscomp$inline_64_inputChannelDataSize$$ && ($totalSize$jscomp$1$$ += 9 + $dataBufferView$jscomp$inline_64_inputChannelDataSize$$);
      $garbageCollectionDataSize$$ && ($totalSize$jscomp$1$$ += 9 + $garbageCollectionDataSize$$);
      $totalSize$jscomp$1$$ += $module$contents$output$ragnarokworker_webrtcBinaryStats$$.size();
      const $dataBuffer$$ = new ArrayBuffer($totalSize$jscomp$1$$);
      $dataBufferView$jscomp$8_offset$jscomp$inline_65$$ = new DataView($dataBuffer$$);
      $header$jscomp$3_offset$jscomp$36$$ = 0;
      (new Uint8Array($dataBuffer$$)).set($dataBufferView$jscomp$inline_42_headerBufferBytes_offset$jscomp$inline_47$$);
      $header$jscomp$3_offset$jscomp$36$$ += $dataBufferView$jscomp$inline_42_headerBufferBytes_offset$jscomp$inline_47$$.length;
      $module$contents$output$ragnarokworker_writeChunkHeader$$($dataBufferView$jscomp$8_offset$jscomp$inline_65$$, $header$jscomp$3_offset$jscomp$36$$, "BPRF", 1, 0, 0);
      $header$jscomp$3_offset$jscomp$36$$ += 9;
      if ($dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$) {
        $module$contents$output$ragnarokworker_writeChunkHeader$$($dataBufferView$jscomp$8_offset$jscomp$inline_65$$, $header$jscomp$3_offset$jscomp$36$$, "PERF", 2, $module$contents$output$ragnarokworker_perfs$$.length, 13);
        $header$jscomp$3_offset$jscomp$36$$ += 9;
        var $dataBufferView$jscomp$inline_42_headerBufferBytes_offset$jscomp$inline_47$$ = $dataBufferView$jscomp$8_offset$jscomp$inline_65$$, $i$jscomp$inline_48_offset$jscomp$inline_43_totalLen$$ = $header$jscomp$3_offset$jscomp$36$$;
        for ($headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$ = 0; $headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$ < $module$contents$output$ragnarokworker_perfs$$.length; $headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$++) {
          $dataBufferView$jscomp$inline_42_headerBufferBytes_offset$jscomp$inline_47$$.setFloat64($i$jscomp$inline_48_offset$jscomp$inline_43_totalLen$$, $module$contents$output$ragnarokworker_perfs$$[$headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$].RAFTS, !0), $dataBufferView$jscomp$inline_42_headerBufferBytes_offset$jscomp$inline_47$$.setUint16($i$jscomp$inline_48_offset$jscomp$inline_43_totalLen$$ + 8, Math.min(1000 * $module$contents$output$ragnarokworker_perfs$$[$headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$].DCSend, 
          65535), !0), $dataBufferView$jscomp$inline_42_headerBufferBytes_offset$jscomp$inline_47$$.setUint16($i$jscomp$inline_48_offset$jscomp$inline_43_totalLen$$ + 10, Math.min(1000 * $module$contents$output$ragnarokworker_perfs$$[$headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$].GetStats, 65535), !0), $dataBufferView$jscomp$inline_42_headerBufferBytes_offset$jscomp$inline_47$$.setUint8($i$jscomp$inline_48_offset$jscomp$inline_43_totalLen$$ + 12, $module$contents$output$ragnarokworker_perfs$$[$headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$].FrameInfo), 
          $i$jscomp$inline_48_offset$jscomp$inline_43_totalLen$$ += 13;
        }
        $header$jscomp$3_offset$jscomp$36$$ += $dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$;
      }
      if ($dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$) {
        $module$contents$output$ragnarokworker_writeChunkHeader$$($dataBufferView$jscomp$8_offset$jscomp$inline_65$$, $header$jscomp$3_offset$jscomp$36$$, "EVNT", 1, $module$contents$output$ragnarokworker_clientEvents$$.length, 72);
        $header$jscomp$3_offset$jscomp$36$$ += 9;
        var $dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$ = $dataBufferView$jscomp$8_offset$jscomp$inline_65$$;
        $dataBufferView$jscomp$inline_42_headerBufferBytes_offset$jscomp$inline_47$$ = $header$jscomp$3_offset$jscomp$36$$;
        for ($i$jscomp$inline_48_offset$jscomp$inline_43_totalLen$$ = 0; $i$jscomp$inline_48_offset$jscomp$inline_43_totalLen$$ < $module$contents$output$ragnarokworker_clientEvents$$.length; $i$jscomp$inline_48_offset$jscomp$inline_43_totalLen$$++) {
          $dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$.setFloat64($dataBufferView$jscomp$inline_42_headerBufferBytes_offset$jscomp$inline_47$$, $module$contents$output$ragnarokworker_clientEvents$$[$i$jscomp$inline_48_offset$jscomp$inline_43_totalLen$$].TS, !0);
          $dataBufferView$jscomp$inline_42_headerBufferBytes_offset$jscomp$inline_47$$ += 8;
          $eventstr$jscomp$inline_49_i$jscomp$inline_58_offset$jscomp$inline_53$$ = $module$contents$output$ragnarokworker_clientEvents$$[$i$jscomp$inline_48_offset$jscomp$inline_43_totalLen$$].eventtype;
          for ($headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$ = 0; $headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$ < $eventstr$jscomp$inline_49_i$jscomp$inline_58_offset$jscomp$inline_53$$.length && 63 > $headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$; $headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$++) {
            $dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$.setUint8($dataBufferView$jscomp$inline_42_headerBufferBytes_offset$jscomp$inline_47$$ + $headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$, $eventstr$jscomp$inline_49_i$jscomp$inline_58_offset$jscomp$inline_53$$.charCodeAt($headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$));
          }
          $dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$.setUint8($dataBufferView$jscomp$inline_42_headerBufferBytes_offset$jscomp$inline_47$$ + $headerBytesBuffer_i$jscomp$inline_44_j$jscomp$inline_50$$, 0);
          $dataBufferView$jscomp$inline_42_headerBufferBytes_offset$jscomp$inline_47$$ += 64;
        }
        $header$jscomp$3_offset$jscomp$36$$ += $dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$;
      }
      if ($dataBufferView$jscomp$inline_56_offset$jscomp$inline_61_sqEventsDataSize$$) {
        $module$contents$output$ragnarokworker_writeChunkHeader$$($dataBufferView$jscomp$8_offset$jscomp$inline_65$$, $header$jscomp$3_offset$jscomp$36$$, "SQEV", 1, $module$contents$output$ragnarokworker_streamingQuality$$.length, 12);
        $header$jscomp$3_offset$jscomp$36$$ += 9;
        var $dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$ = $dataBufferView$jscomp$8_offset$jscomp$inline_65$$, $eventstr$jscomp$inline_49_i$jscomp$inline_58_offset$jscomp$inline_53$$ = $header$jscomp$3_offset$jscomp$36$$;
        for ($dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$ = 0; $dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$ < $module$contents$output$ragnarokworker_streamingQuality$$.length; $dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$++) {
          $dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$.setUint8($eventstr$jscomp$inline_49_i$jscomp$inline_58_offset$jscomp$inline_53$$, $module$contents$output$ragnarokworker_streamingQuality$$[$dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$].qualityScore), $dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$.setUint8($eventstr$jscomp$inline_49_i$jscomp$inline_58_offset$jscomp$inline_53$$ + 
          1, $module$contents$output$ragnarokworker_streamingQuality$$[$dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$].bandwidthScore), $dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$.setUint8($eventstr$jscomp$inline_49_i$jscomp$inline_58_offset$jscomp$inline_53$$ + 2, $module$contents$output$ragnarokworker_streamingQuality$$[$dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$].latencyScore), $dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$.setUint8($eventstr$jscomp$inline_49_i$jscomp$inline_58_offset$jscomp$inline_53$$ + 
          3, $module$contents$output$ragnarokworker_streamingQuality$$[$dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$].networkLossScore), $dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$.setFloat64($eventstr$jscomp$inline_49_i$jscomp$inline_58_offset$jscomp$inline_53$$ + 4, $module$contents$output$ragnarokworker_streamingQuality$$[$dataBufferView$jscomp$inline_46_i$jscomp$inline_54_perfDataSize$$].timestamp, !0), $eventstr$jscomp$inline_49_i$jscomp$inline_58_offset$jscomp$inline_53$$ += 
          12;
        }
        $header$jscomp$3_offset$jscomp$36$$ += $dataBufferView$jscomp$inline_56_offset$jscomp$inline_61_sqEventsDataSize$$;
      }
      if ($dataBufferView$jscomp$inline_60_durationDataSize_i$jscomp$inline_66$$) {
        $module$contents$output$ragnarokworker_writeChunkHeader$$($dataBufferView$jscomp$8_offset$jscomp$inline_65$$, $header$jscomp$3_offset$jscomp$36$$, "MTBD", 1, $module$contents$output$ragnarokworker_mtbDurations$$.length, 10);
        $header$jscomp$3_offset$jscomp$36$$ += 9;
        var $dataBufferView$jscomp$inline_56_offset$jscomp$inline_61_sqEventsDataSize$$ = $dataBufferView$jscomp$8_offset$jscomp$inline_65$$;
        $dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$ = $header$jscomp$3_offset$jscomp$36$$;
        for ($eventstr$jscomp$inline_49_i$jscomp$inline_58_offset$jscomp$inline_53$$ = 0; $eventstr$jscomp$inline_49_i$jscomp$inline_58_offset$jscomp$inline_53$$ < $module$contents$output$ragnarokworker_mtbDurations$$.length; $eventstr$jscomp$inline_49_i$jscomp$inline_58_offset$jscomp$inline_53$$++) {
          $dataBufferView$jscomp$inline_56_offset$jscomp$inline_61_sqEventsDataSize$$.setFloat64($dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$, $module$contents$output$ragnarokworker_mtbDurations$$[$eventstr$jscomp$inline_49_i$jscomp$inline_58_offset$jscomp$inline_53$$].timestamp, !0), $dataBufferView$jscomp$inline_56_offset$jscomp$inline_61_sqEventsDataSize$$.setUint16($dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$ + 
          8, Math.min($module$contents$output$ragnarokworker_mtbDurations$$[$eventstr$jscomp$inline_49_i$jscomp$inline_58_offset$jscomp$inline_53$$].duration, 65535), !0), $dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$ += 10;
        }
        $header$jscomp$3_offset$jscomp$36$$ += $dataBufferView$jscomp$inline_60_durationDataSize_i$jscomp$inline_66$$;
      }
      if ($dataBufferView$jscomp$inline_64_inputChannelDataSize$$) {
        $module$contents$output$ragnarokworker_writeChunkHeader$$($dataBufferView$jscomp$8_offset$jscomp$inline_65$$, $header$jscomp$3_offset$jscomp$36$$, "INPT", 1, $module$contents$output$ragnarokworker_inputChannelStats$$.length, 12);
        $header$jscomp$3_offset$jscomp$36$$ += 9;
        var $dataBufferView$jscomp$inline_60_durationDataSize_i$jscomp$inline_66$$ = $dataBufferView$jscomp$8_offset$jscomp$inline_65$$;
        $dataBufferView$jscomp$inline_56_offset$jscomp$inline_61_sqEventsDataSize$$ = $header$jscomp$3_offset$jscomp$36$$;
        for ($dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$ = 0; $dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$ < $module$contents$output$ragnarokworker_inputChannelStats$$.length; $dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$++) {
          $dataBufferView$jscomp$inline_60_durationDataSize_i$jscomp$inline_66$$.setFloat64($dataBufferView$jscomp$inline_56_offset$jscomp$inline_61_sqEventsDataSize$$, $module$contents$output$ragnarokworker_inputChannelStats$$[$dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$].timestamp, !0), $dataBufferView$jscomp$inline_60_durationDataSize_i$jscomp$inline_66$$.setUint16($dataBufferView$jscomp$inline_56_offset$jscomp$inline_61_sqEventsDataSize$$ + 8, Math.min($module$contents$output$ragnarokworker_inputChannelStats$$[$dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$].bufferedAmount, 
          65535), !0), $dataBufferView$jscomp$inline_60_durationDataSize_i$jscomp$inline_66$$.setUint16($dataBufferView$jscomp$inline_56_offset$jscomp$inline_61_sqEventsDataSize$$ + 10, Math.min($module$contents$output$ragnarokworker_inputChannelStats$$[$dataBufferView$jscomp$inline_52_eventsDataSize_i$jscomp$inline_62_offset$jscomp$inline_57$$].maxSchedulingDelay, 65535), !0), $dataBufferView$jscomp$inline_56_offset$jscomp$inline_61_sqEventsDataSize$$ += 12;
        }
        $header$jscomp$3_offset$jscomp$36$$ += $dataBufferView$jscomp$inline_64_inputChannelDataSize$$;
      }
      if ($garbageCollectionDataSize$$) {
        $module$contents$output$ragnarokworker_writeChunkHeader$$($dataBufferView$jscomp$8_offset$jscomp$inline_65$$, $header$jscomp$3_offset$jscomp$36$$, "GRBG", 1, $module$contents$output$ragnarokworker_garbageCollectionStats$$.length, 16);
        $header$jscomp$3_offset$jscomp$36$$ += 9;
        var $dataBufferView$jscomp$inline_64_inputChannelDataSize$$ = $dataBufferView$jscomp$8_offset$jscomp$inline_65$$, $dataBufferView$jscomp$8_offset$jscomp$inline_65$$ = $header$jscomp$3_offset$jscomp$36$$;
        for ($dataBufferView$jscomp$inline_60_durationDataSize_i$jscomp$inline_66$$ = 0; $dataBufferView$jscomp$inline_60_durationDataSize_i$jscomp$inline_66$$ < $module$contents$output$ragnarokworker_garbageCollectionStats$$.length; $dataBufferView$jscomp$inline_60_durationDataSize_i$jscomp$inline_66$$++) {
          $dataBufferView$jscomp$inline_64_inputChannelDataSize$$.setFloat64($dataBufferView$jscomp$8_offset$jscomp$inline_65$$, $module$contents$output$ragnarokworker_garbageCollectionStats$$[$dataBufferView$jscomp$inline_60_durationDataSize_i$jscomp$inline_66$$].timestamp, !0), $dataBufferView$jscomp$inline_64_inputChannelDataSize$$.setInt32($dataBufferView$jscomp$8_offset$jscomp$inline_65$$ + 8, $module$contents$output$ragnarokworker_asInt32$$($module$contents$output$ragnarokworker_garbageCollectionStats$$[$dataBufferView$jscomp$inline_60_durationDataSize_i$jscomp$inline_66$$].deltaUsedHeapSize), 
          !0), $dataBufferView$jscomp$inline_64_inputChannelDataSize$$.setInt32($dataBufferView$jscomp$8_offset$jscomp$inline_65$$ + 12, $module$contents$output$ragnarokworker_asInt32$$($module$contents$output$ragnarokworker_garbageCollectionStats$$[$dataBufferView$jscomp$inline_60_durationDataSize_i$jscomp$inline_66$$].deltaTotalHeapSize), !0), $dataBufferView$jscomp$8_offset$jscomp$inline_65$$ += 16;
        }
        $header$jscomp$3_offset$jscomp$36$$ += $garbageCollectionDataSize$$;
      }
      let $buffer$jscomp$17$$ = new Uint8Array($dataBuffer$$);
      $module$contents$output$ragnarokworker_webrtcBinaryStats$$.write($buffer$jscomp$17$$, $header$jscomp$3_offset$jscomp$36$$);
      null === $module$contents$output$ragnarokworker_webSocket$$ || void 0 === $module$contents$output$ragnarokworker_webSocket$$ ? void 0 : $module$contents$output$ragnarokworker_webSocket$$.send({stats:$dataBuffer$$, ackid:$module$contents$output$ragnarokworker_serverSupportsAck$$ ? $module$contents$output$ragnarokworker_nextAckIdToSendForStats$$ : void 0});
    } catch ($err$jscomp$3$$) {
      $module$contents$output$ragnarokworker_workerException$$("Exception in perf/stats upload. Error : " + $err$jscomp$3$$.message + " stack: " + $err$jscomp$3$$.stack);
    }
  }
  $module$contents$output$ragnarokworker_clearCachedData$$();
}
function $module$contents$output$ragnarokworker_wsMessageHandler$$($data$jscomp$83$$) {
  $module$contents$output$ragnarokworker_serverSupportsAck$$ || void 0 === $data$jscomp$83$$.ackid || ($module$contents$output$ragnarokworker_serverSupportsAck$$ = !0);
  $module$contents$output$ragnarokworker_ctx$$.postMessage({wsMessage:$data$jscomp$83$$});
}
function $module$contents$output$ragnarokworker_wsCloseHandler$$($data$jscomp$84$$) {
  $module$contents$output$ragnarokworker_ctx$$.postMessage({wsClose:$data$jscomp$84$$});
}
function $module$contents$output$ragnarokworker_wsOpenHandler$$() {
  $module$contents$output$ragnarokworker_ctx$$.postMessage({wsOpen:!0});
}
function $module$contents$output$ragnarokworker_wsOpeningHandler$$() {
  $module$contents$output$ragnarokworker_ctx$$.postMessage({wsOpening:!0});
}
function $module$contents$output$ragnarokworker_createWebSocket$$($maxReceivedAckId$jscomp$1$$, $reconnect$jscomp$2$$) {
  $module$contents$output$ragnarokworker_webSocket$$ = new $module$exports$output$websocketimpl$WebSocketImpl$$();
  $module$contents$output$ragnarokworker_webSocket$$.initialize($module$contents$output$ragnarokworker_url$$, $maxReceivedAckId$jscomp$1$$, $module$contents$output$ragnarokworker_serverSupportsAck$$, $reconnect$jscomp$2$$);
  $module$contents$output$ragnarokworker_wsOpeningHandler$$();
}
$module$contents$output$ragnarokworker_ctx$$.onmessage = function($message$jscomp$34$$) {
  try {
    const $data$jscomp$85$$ = $message$jscomp$34$$.data;
    $data$jscomp$85$$.initMessage ? ($module$contents$output$ragnarokworker_sessionId$$ = $data$jscomp$85$$.initMessage.sessionId, $module$contents$output$ragnarokworker_workerLogger$$("{6ccab8d}")) : $data$jscomp$85$$.perf ? $module$contents$output$ragnarokworker_perfs$$.push($data$jscomp$85$$.perf) : $data$jscomp$85$$.clientEvent ? $module$contents$output$ragnarokworker_clientEvents$$.push($data$jscomp$85$$.clientEvent) : $data$jscomp$85$$.startStats ? ($module$contents$output$ragnarokworker_statsHeaderObj$$ = 
    $data$jscomp$85$$.startStats.statsHeader, $module$contents$output$ragnarokworker_uploadIntervalId$$ = self.setInterval(() => $module$contents$output$ragnarokworker_uploadData$$(), 5000), $module$contents$output$ragnarokworker_ctx$$.postMessage({statsStarted:!0}), $module$contents$output$ragnarokworker_workerLogger$$("{5209d98}")) : $data$jscomp$85$$.stopStats ? (self.clearInterval($module$contents$output$ragnarokworker_uploadIntervalId$$), $module$contents$output$ragnarokworker_uploadData$$(), 
    $module$contents$output$ragnarokworker_clearCachedData$$(), $module$contents$output$ragnarokworker_workerLogger$$("{b58b6ad}")) : $data$jscomp$85$$.webrtcStats ? ($data$jscomp$85$$.ackid && ($module$contents$output$ragnarokworker_nextAckIdToSendForStats$$ = $data$jscomp$85$$.ackid), $data$jscomp$85$$.webrtcStats.stats && $JSCompiler_StaticMethods_addReport$$($data$jscomp$85$$.webrtcStats)) : $data$jscomp$85$$.sq ? $module$contents$output$ragnarokworker_streamingQuality$$.push($data$jscomp$85$$.sq) : 
    $data$jscomp$85$$.startWebSocket ? ($module$contents$output$ragnarokworker_url$$ = $data$jscomp$85$$.startWebSocket.signInURL, $module$contents$output$ragnarokworker_serverSupportsAck$$ = $data$jscomp$85$$.startWebSocket.serverSupportsAck, $module$contents$output$ragnarokworker_createWebSocket$$($data$jscomp$85$$.startWebSocket.maxReceivedAckId, $data$jscomp$85$$.startWebSocket.reconnect)) : $data$jscomp$85$$.stopWebSocket ? (null === $module$contents$output$ragnarokworker_webSocket$$ || void 0 === 
    $module$contents$output$ragnarokworker_webSocket$$ ? void 0 : $module$contents$output$ragnarokworker_webSocket$$.uninitialize(), $module$contents$output$ragnarokworker_serverSupportsAck$$ = !1) : $data$jscomp$85$$.send ? null === $module$contents$output$ragnarokworker_webSocket$$ || void 0 === $module$contents$output$ragnarokworker_webSocket$$ ? void 0 : $module$contents$output$ragnarokworker_webSocket$$.send($data$jscomp$85$$.send) : $data$jscomp$85$$.duration ? $module$contents$output$ragnarokworker_mtbDurations$$.push($data$jscomp$85$$.duration) : 
    $data$jscomp$85$$.inputChannelStats ? $module$contents$output$ragnarokworker_inputChannelStats$$.push($data$jscomp$85$$.inputChannelStats) : $data$jscomp$85$$.garbageCollectionStats && $module$contents$output$ragnarokworker_garbageCollectionStats$$.push($data$jscomp$85$$.garbageCollectionStats);
  } catch ($exp$jscomp$1$$) {
    $module$contents$output$ragnarokworker_workerException$$("Worker onmessage exception: " + $exp$jscomp$1$$);
  }
};


//# sourceMappingURL=ragnarokworker.js.map
