/**
 * @param  {Object} possible options: videoCodec, videoProfile, videoLevel,
 * audioCodec, audioLevel
 * @return {String} b.e.: avc1.4d401e, mp4a.40.5
 * @see https://wiki.whatwg.org/wiki/Video_type_parameters
 * Implemented only h264 and aac
 * @throws {Exception} If invalid or unsupported option is met
 */
module.exports = function(opts) {
  var codecs = '';
  var vc = video(opts);
  var ac = audio(opts);
  if (vc) {
    codecs += vc;
  }
  if (vc && ac) {
    codecs += ',';
  }
  if (ac) {
    codecs += ac;
  }
  return codecs;
};

function video(opts) {
  if (!opts.videoCodec || !opts.videoProfile || !opts.videoLevel) {
    return;
  }
  return videoCodec(opts.videoCodec) + videoProfile(opts.videoProfile) +
         videoLevel(opts.videoLevel);

}

function videoCodec(codec) {
  if (codec.toLowerCase() == 'h264') {
    return 'avc1.';
  } else {
    throw 'Invalid or unsupported video codec ' + codec;
  }
}

function videoProfile(profile) {
  switch (profile.toLowerCase()) {
    case 'baseline': return '42E0';
    case 'main': return '4D40';
    case 'high': return '6400';
    default:
      throw 'Invalid or unsupported video profile ' + profile;
  }
}

function videoLevel(level) {
  return (level * 10).toString(16);
}

function audio(opts) {
  if (!opts.audioCodec) {
    return;
  }
  return audioCodec(opts.audioCodec) + audioProfile(opts.audioProfile);
}

function audioCodec(codec) {
  if (codec.toLowerCase() == 'aac') {
    return 'mp4a.40.';
  } else {
    throw 'Invalid or unsupported audio codec ' + codec;
  }
}

function audioProfile(profile) {
  if (profile.toLowerCase() == 'hc') {
    return '5';
  } else {
    return '2';
  }
}