import { DetectionResult, SampleCase, MediaFile, VerdictType } from '../types/forensic';

export const SAMPLE_CASES: SampleCase[] = [
  {
    id: 'sample-deepfake-speech',
    title: 'Synthetic Politician Press Address',
    type: 'video',
    category: 'Facial Warping & Lip-Sync',
    description: 'High-definition video with neural facial reenactment and generative audio-visual synthesis.',
    imageUrl: '/src/assets/images/sample_swap_interview_1791365706228.jpg',
    expectedVerdict: 'DEEPFAKE',
    sampleResult: {
      id: 'res-df-01',
      mediaFile: {
        id: 'sample-df-01',
        name: 'Politician_Press_Reenactment_1080p.mp4',
        size: 14820000,
        sizeFormatted: '14.8 MB',
        type: 'video',
        url: '/src/assets/images/sample_swap_interview_1791365706228.jpg',
        dimensions: '1920 × 1080',
        duration: '00:14',
        fps: 30,
        codec: 'H.264 / AAC',
        hash: 'e8c3a9f02914db48c903829471928374a019485b3728491028375839201948a1',
      },
      verdict: 'DEEPFAKE',
      confidenceScore: 96.8,
      syntheticProbability: 98.4,
      riskLevel: 'CRITICAL',
      timestamp: '2026-10-07 09:41:22 UTC',
      inferenceDurationMs: 1480,
      framesAnalyzed: 420,
      facesDetected: 1,
      integrityHash: 'e8c3a9f02914db48c903829471928374a019485b3728491028375839201948a1',
      executiveSummary: 'Definite synthetic media manipulation identified. The inspected video displays significant high-frequency Fourier spectral anomalies, facial seam blending blur, and lip-audio phonetic timing offsets consistent with SimSwap and Wav2Lip diffusion pipelines.',
      detailedAnalysis: 'Neural landmark evaluation on 420 video frames revealed unnatural warping vectors around the jawline and nasal bridge. Frequency spectral decomposition (2D-FFT) detected sharp synthetic checkerboard harmonics in the 12kHz–16kHz visual spatial domain, typical of generative upsampling layers. Corneal reflection specular highlights failed bilateral symmetry verification.',
      primaryArchitectureDetected: 'SimSwap + Wav2Lip Latent Diffusion',
      metrics: {
        facialBoundary: {
          id: 'm-facial',
          title: 'Facial Boundary & Warping',
          score: 94,
          status: 'anomaly',
          verdict: 'Severe Blending Discontinuity',
          details: 'Micro-blur boundary detected along the chin and temporal hairline indicative of Poisson mask blending.',
          evidence: [
            'Warping divergence index: 0.88 (Nominal < 0.15)',
            'Jaw contour gradient variance exceeds human baseline by 320%',
            'Temporal seam jitter across consecutive frames 142–210'
          ]
        },
        frequencySpectral: {
          id: 'm-fft',
          title: '2D-FFT Spectral Harmonics',
          score: 97,
          status: 'anomaly',
          verdict: 'Synthetic Resampling Periodicities',
          details: 'High-frequency grid peaks in azimutal spectral power spectrum, a distinctive fingerprint of transposed convolutional decoders.',
          evidence: [
            'Deconvolution artifact signature: Confirmed at 8.4 cycles/pixel',
            'Spectral slope variance: -3.8 dB/octave anomaly',
            'Zero natural Bayer filter chromatic noise in central ROI'
          ]
        },
        eyeDynamics: {
          id: 'm-eye',
          title: 'Corneal Reflections & Gaze',
          score: 89,
          status: 'anomaly',
          verdict: 'Specular Geometry Mismatch',
          details: 'Light reflections across the left and right irises originate from divergent synthetic illumination vectors.',
          evidence: [
            'Bilateral pupil aspect ratio mismatch: 14.2%',
            'Blink interval irregularity: 0 blinks detected over 14.0 seconds',
            'Absence of micro-saccadic eye movement tremor'
          ]
        },
        lightingConsistency: {
          id: 'm-light',
          title: '3D Illumination Vector Field',
          score: 92,
          status: 'anomaly',
          verdict: 'Ambient Shading Divergence',
          details: 'Subject facial normal vectors show lighting angle of azimuth 42°, while room background key light is oriented at 135°.',
          evidence: [
            'Spherical harmonics irradiance discordance: 2.41',
            'Cast shadow edge softness inconsistent with scene keylight',
            'Cheekbone subsurface scattering absent in synthetic layers'
          ]
        },
        audioVisualSync: {
          id: 'm-av',
          title: 'Phonetic Lip-Audio Synchrony',
          score: 85,
          status: 'anomaly',
          verdict: 'Bilabial Plosive Offset',
          details: 'Acoustic /p/ and /b/ phoneme timestamps diverge from visual lip closure by 128ms, typical of speech-driven retargeting.',
          evidence: [
            'SyncNet confidence score: -4.82 (threshold: +2.50)',
            'Phoneme-viseme correlation coefficient: 0.41',
            'Acoustic spectral formants do not match vocal tract geometry'
          ]
        },
        metadataForensics: {
          id: 'm-meta',
          title: 'Container & Compression Forensics',
          score: 78,
          status: 'warning',
          verdict: 'Double-Encoding Signatures',
          details: 'Quantization matrices show evidence of secondary re-compression pass without original camera firmware header.',
          evidence: [
            'Missing camera sensor EXIF tags / atom metadata',
            'Non-standard GOP length (120 frames)',
            'Ghost DCT blocking patterns present in Y-luminance channel'
          ]
        }
      },
      spectralBands: [
        { band: 'Low Band (0–2 kHz)', frequency: '0.4 kHz', power: 88, expected: 85, delta: 3, hasArtifact: false },
        { band: 'Mid-Low (2–6 kHz)', frequency: '4.2 kHz', power: 74, expected: 70, delta: 4, hasArtifact: false },
        { band: 'Mid-High (6–10 kHz)', frequency: '8.1 kHz', power: 65, expected: 42, delta: 23, hasArtifact: true },
        { band: 'High Band (10–14 kHz)', frequency: '12.4 kHz', power: 78, expected: 24, delta: 54, hasArtifact: true },
        { band: 'Nyquist Limit (14–16 kHz)', frequency: '15.2 kHz', power: 58, expected: 12, delta: 46, hasArtifact: true },
      ],
      telemetryLogs: [
        { timestamp: '00:00.012', stage: 'INGEST', message: 'H.264 stream demuxed: 420 frames @ 30.00 FPS, 1920x1080 YUV420p', level: 'info' },
        { timestamp: '00:00.180', stage: 'ROI_LOC', message: 'RetinaFace landmark tracker anchored 68 facial points on primary subject', level: 'info' },
        { timestamp: '00:00.410', stage: 'FFT_2D', message: 'Radial Fourier transform flagged severe periodic deconvolution spikes', level: 'alert' },
        { timestamp: '00:00.820', stage: 'BIOMETRICS', message: 'Eye dynamics monitor: Zero blink occurrence detected in 14s duration', level: 'warn' },
        { timestamp: '00:01.120', stage: 'SYNC_NET', message: 'Audio-visual landmark sync offset calculated at -128ms latency', level: 'alert' },
        { timestamp: '00:01.440', stage: 'ENSEMBLE', message: 'EfficientNet-B7 + MesoNet-4 weighted consensus: 96.8% DEEPFAKE', level: 'alert' }
      ]
    }
  },
  {
    id: 'sample-authentic-press',
    title: 'Authentic Press Conference Documentary',
    type: 'video',
    category: 'Verified Broadcast Media',
    description: 'Documentary footage shot on broadcast sensor with authentic biological micro-expressions.',
    imageUrl: '/src/assets/images/sample_authentic_portrait_1791365690864.jpg',
    expectedVerdict: 'REAL',
    sampleResult: {
      id: 'res-auth-02',
      mediaFile: {
        id: 'sample-auth-02',
        name: 'WhiteHouse_PressBriefing_Original_Raw.mov',
        size: 38400000,
        sizeFormatted: '38.4 MB',
        type: 'video',
        url: '/src/assets/images/sample_authentic_portrait_1791365690864.jpg',
        dimensions: '1920 × 1080',
        duration: '00:18',
        fps: 29.97,
        codec: 'ProRes 422 / PCM',
        hash: '4a91b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcde',
      },
      verdict: 'REAL',
      confidenceScore: 98.4,
      syntheticProbability: 1.6,
      riskLevel: 'LOW',
      timestamp: '2026-10-07 10:15:04 UTC',
      inferenceDurationMs: 1320,
      framesAnalyzed: 540,
      facesDetected: 1,
      integrityHash: '4a91b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcde',
      executiveSummary: 'Authenticated organic media stream. All multi-spectral neural inspection checks verified zero synthetic generative artifacts. Biological micro-tremors, natural eye blink cadence, and continuous camera sensor PRNU noise are fully intact.',
      detailedAnalysis: 'Analysis confirmed natural Photo-Response Non-Uniformity (PRNU) sensor noise across all 540 video frames. Fast Fourier Transform displays continuous biological decay curve with zero periodic generator lattice spikes. Corneal specular reflections strictly match the 3-point physical studio lighting geometry.',
      primaryArchitectureDetected: 'None (Natural Optical Camera Capture)',
      metrics: {
        facialBoundary: {
          id: 'm-facial',
          title: 'Facial Boundary & Warping',
          score: 3,
          status: 'nominal',
          verdict: 'Natural Anatomical Continuity',
          details: 'Facial epidermis, pore structure, and hair follicles seamlessly blend with background depth-of-field.',
          evidence: [
            'Warping divergence index: 0.04 (Nominal < 0.15)',
            'Pore micro-structure continuous across boundary zones',
            'Natural motion blur conforms to 1/60s shutter angle'
          ]
        },
        frequencySpectral: {
          id: 'm-fft',
          title: '2D-FFT Spectral Harmonics',
          score: 2,
          status: 'nominal',
          verdict: 'Natural Optical Decay Profile',
          details: 'Power spectral density adheres strictly to 1/f^alpha natural image statistics across all color channels.',
          evidence: [
            'Zero deconvolution lattice peaks detected',
            'Spectral slope: -2.1 dB/octave (ideal natural optic range)',
            'Consistent CMOS Bayer sensor shot-noise distribution'
          ]
        },
        eyeDynamics: {
          id: 'm-eye',
          title: 'Corneal Reflections & Gaze',
          score: 4,
          status: 'nominal',
          verdict: 'Coherent Biological Saccades',
          details: 'Saccadic eye movements and corneal reflection highlights correspond exactly to ambient studio softboxes.',
          evidence: [
            'Bilateral pupil convergence index: 0.99 (optimal)',
            'Natural spontaneous blink rate: 4 blinks in 18s (13.3/min baseline)',
            'Organic vascular micro-patterns verified in sclera'
          ]
        },
        lightingConsistency: {
          id: 'm-light',
          title: '3D Illumination Vector Field',
          score: 2,
          status: 'nominal',
          verdict: 'Unified Environmental Lighting',
          details: 'Skin subsurface scattering, specular reflection, and ambient occlusion match physical 3D ground truth.',
          evidence: [
            'Spherical harmonics irradiance discordance: 0.08',
            'Albedo values consistent with human dermal physiology',
            'Shadow terminator boundaries conform strictly to facial geometry'
          ]
        },
        audioVisualSync: {
          id: 'm-av',
          title: 'Phonetic Lip-Audio Synchrony',
          score: 5,
          status: 'nominal',
          verdict: 'Strict Phonetic-Viseme Alignment',
          details: 'Acoustic vocal tract resonance aligns with muscular orbicularis oris motion within 4ms precision.',
          evidence: [
            'SyncNet confidence score: +8.92 (High confidence authentic)',
            'Phoneme-viseme correlation coefficient: 0.96',
            'Natural micro-breathing transitions precede plosive syllables'
          ]
        },
        metadataForensics: {
          id: 'm-meta',
          title: 'Container & Compression Forensics',
          score: 1,
          status: 'nominal',
          verdict: 'Pristine Camera Master Container',
          details: 'Valid camera firmware metadata, single-pass broadcast encoder atom, and linear audio timing.',
          evidence: [
            'Sony CineAlta broadcast timecode track present and unbroken',
            'Standard uniform macroblock quantization tables',
            'Zero double-compression ghosting detected'
          ]
        }
      },
      spectralBands: [
        { band: 'Low Band (0–2 kHz)', frequency: '0.4 kHz', power: 92, expected: 90, delta: 2, hasArtifact: false },
        { band: 'Mid-Low (2–6 kHz)', frequency: '4.2 kHz', power: 68, expected: 67, delta: 1, hasArtifact: false },
        { band: 'Mid-High (6–10 kHz)', frequency: '8.1 kHz', power: 44, expected: 45, delta: -1, hasArtifact: false },
        { band: 'High Band (10–14 kHz)', frequency: '12.4 kHz', power: 25, expected: 26, delta: -1, hasArtifact: false },
        { band: 'Nyquist Limit (14–16 kHz)', frequency: '15.2 kHz', power: 11, expected: 12, delta: -1, hasArtifact: false },
      ],
      telemetryLogs: [
        { timestamp: '00:00.008', stage: 'INGEST', message: 'Stream demuxed: 540 frames @ 29.97 FPS, ProRes broadcast codec', level: 'info' },
        { timestamp: '00:00.140', stage: 'SENSOR_PRNU', message: 'Extracted sensor fingerprint matched consistent CMOS silicon noise', level: 'success' },
        { timestamp: '00:00.380', stage: 'FFT_2D', message: '2D-FFT analysis confirmed continuous 1/f natural gradient decay', level: 'success' },
        { timestamp: '00:00.750', stage: 'BIOMETRICS', message: 'Corneal reflection vectors conform to single light source field', level: 'success' },
        { timestamp: '00:01.050', stage: 'SYNC_NET', message: 'Audio-visual landmark correlation verified at +8.92 SyncNet score', level: 'success' },
        { timestamp: '00:01.320', stage: 'ENSEMBLE', message: 'Forensic integrity consensus: 98.4% AUTHENTIC HUMAN MEDIA', level: 'success' }
      ]
    }
  }
];

// Helper to generate dynamic, realistic forensic reports for user uploaded files
export function generateMockDetection(file: MediaFile, userVerdictOverride?: VerdictType): DetectionResult {
  const isDeepfake = userVerdictOverride 
    ? userVerdictOverride === 'DEEPFAKE'
    : (file.name.toLowerCase().includes('fake') || 
       file.name.toLowerCase().includes('deep') || 
       file.name.toLowerCase().includes('swap') || 
       file.name.toLowerCase().includes('synth') || 
       file.name.toLowerCase().includes('ai') || 
       file.size % 2 === 0);

  const hashSample = file.hash || Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const frames = file.type === 'video' ? Math.floor(Math.random() * 300) + 180 : 1;
  const durationMs = Math.floor(Math.random() * 600) + 1200;

  if (isDeepfake) {
    const confidence = +(92 + Math.random() * 6).toFixed(1);
    const synthProb = +(95 + Math.random() * 4.5).toFixed(1);
    return {
      id: `res-${Date.now()}`,
      mediaFile: file,
      verdict: 'DEEPFAKE',
      confidenceScore: confidence,
      syntheticProbability: synthProb,
      riskLevel: confidence > 95 ? 'CRITICAL' : 'HIGH',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      inferenceDurationMs: durationMs,
      framesAnalyzed: frames,
      facesDetected: 1,
      integrityHash: hashSample,
      executiveSummary: `Synthetic media manipulation confirmed with ${confidence}% forensic confidence. Multi-model inspection identified recurring spatial-temporal blending seams, abnormal 2D-FFT high frequency checkerboard harmonics, and unnatural ocular specular dynamics.`,
      detailedAnalysis: `The file '${file.name}' exhibits significant anomalous divergence in neural face boundary reconstruction. Convolutional deconvolution artifacts were registered across the 10kHz–14kHz spectral bands. Facial landmark dynamics show micro-jitter inconsistent with genuine human anatomical kinematics.`,
      primaryArchitectureDetected: 'Latent Diffusion + Neural Face Reenactment',
      metrics: {
        facialBoundary: {
          id: 'm-facial',
          title: 'Facial Boundary & Warping',
          score: 93,
          status: 'anomaly',
          verdict: 'Seam Blending Artifacts',
          details: 'Poisson boundary discontinuity detected around the chin and hairline perimeter.',
          evidence: [
            'Warping divergence index: 0.84 (Threshold: 0.15)',
            'Boundary gradient deviation: +280% vs human baseline',
            'Sub-pixel mask edge interpolation anomalies observed'
          ]
        },
        frequencySpectral: {
          id: 'm-fft',
          title: '2D-FFT Spectral Harmonics',
          score: 96,
          status: 'anomaly',
          verdict: 'Periodic Deconvolution Lattice',
          details: 'Sharp frequency power spikes present in azimuth radial spectrum, typical of neural generator upsampling.',
          evidence: [
            'Upsampling lattice signature at 8.2 cycles/pixel',
            'High-frequency energy +45 dB above natural camera noise',
            'Missing physical CMOS sensor shot-noise characteristics'
          ]
        },
        eyeDynamics: {
          id: 'm-eye',
          title: 'Corneal Reflections & Gaze',
          score: 87,
          status: 'anomaly',
          verdict: 'Specular Highlight Asymmetry',
          details: 'Corneal specular highlight vectors do not coincide with virtual scene illumination.',
          evidence: [
            'Bilateral iris light-angle discrepancy: 24.6°',
            'Absence of physiologic micro-tremor in ocular fixation',
            'Abnormal pupil dilation contour geometry'
          ]
        },
        lightingConsistency: {
          id: 'm-light',
          title: '3D Illumination Vector Field',
          score: 88,
          status: 'anomaly',
          verdict: 'Ambient Vector Divergence',
          details: 'Subject face lighting normal diverges from background ambient keylight field.',
          evidence: [
            'Irradiance tensor disparity: 2.15',
            'Specular falloff rate violates inverse square law',
            'Albedo color temperature mismatch: 4200K (face) vs 5600K (scene)'
          ]
        },
        audioVisualSync: {
          id: 'm-av',
          title: 'Phonetic Lip-Audio Synchrony',
          score: file.type === 'video' ? 82 : 45,
          status: file.type === 'video' ? 'anomaly' : 'nominal',
          verdict: file.type === 'video' ? 'Phoneme-Viseme Desync' : 'N/A (Still Image)',
          details: file.type === 'video' 
            ? 'Lip landmark convergence lags audio formants by 115ms.' 
            : 'Still image evaluation; acoustic stream not applicable.',
          evidence: file.type === 'video' ? [
            'SyncNet confidence score: -3.9 (Desync confirmed)',
            'Formant F1/F2 frequency misalignment on vowels',
            'Kinematic jaw acceleration outside anatomical parameters'
          ] : [
            'Single frame visual modality verified'
          ]
        },
        metadataForensics: {
          id: 'm-meta',
          title: 'Container & Compression Forensics',
          score: 76,
          status: 'warning',
          verdict: 'Re-Encoding Quantization Fingerprint',
          details: 'Non-standard quantization tables and absent original hardware camera metadata.',
          evidence: [
            'No hardware sensor serial or lens profile tags found',
            'Ghost DCT block boundaries in luminance plane',
            'Software export signatures detected in container atom'
          ]
        }
      },
      spectralBands: [
        { band: 'Low Band (0–2 kHz)', frequency: '0.4 kHz', power: 85, expected: 85, delta: 0, hasArtifact: false },
        { band: 'Mid-Low (2–6 kHz)', frequency: '4.2 kHz', power: 72, expected: 68, delta: 4, hasArtifact: false },
        { band: 'Mid-High (6–10 kHz)', frequency: '8.1 kHz', power: 64, expected: 44, delta: 20, hasArtifact: true },
        { band: 'High Band (10–14 kHz)', frequency: '12.4 kHz', power: 76, expected: 26, delta: 50, hasArtifact: true },
        { band: 'Nyquist Limit (14–16 kHz)', frequency: '15.2 kHz', power: 54, expected: 14, delta: 40, hasArtifact: true },
      ],
      telemetryLogs: [
        { timestamp: '00:00.010', stage: 'INGEST', message: `Parsed input media stream: ${file.name} (${file.sizeFormatted})`, level: 'info' },
        { timestamp: '00:00.220', stage: 'ALIGNMENT', message: 'Facial ROI located and standardized to 512x512 tensor buffer', level: 'info' },
        { timestamp: '00:00.580', stage: 'FFT_2D', message: 'Frequency decomposition registered high-energy lattice anomalies', level: 'alert' },
        { timestamp: '00:00.910', stage: 'BIOMETRICS', message: 'Corneal highlight vectors failed bilateral physical symmetry', level: 'alert' },
        { timestamp: '00:01.210', stage: 'QUANT_DCT', message: 'Quantization table inconsistency indicates generative re-encoding', level: 'warn' },
        { timestamp: '00:01.460', stage: 'ENSEMBLE', message: `Consensus reached: ${confidence}% DEEPFAKE probability`, level: 'alert' }
      ]
    };
  } else {
    const confidence = +(96 + Math.random() * 3.5).toFixed(1);
    const synthProb = +(1 + Math.random() * 3).toFixed(1);
    return {
      id: `res-${Date.now()}`,
      mediaFile: file,
      verdict: 'REAL',
      confidenceScore: confidence,
      syntheticProbability: synthProb,
      riskLevel: 'LOW',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      inferenceDurationMs: durationMs,
      framesAnalyzed: frames,
      facesDetected: 1,
      integrityHash: hashSample,
      executiveSummary: `Media verified as authentic organic capture with ${confidence}% confidence. Zero synthetic neural manipulation, boundary seam blending, or Fourier frequency lattice anomalies were detected.`,
      detailedAnalysis: `The file '${file.name}' successfully passed all 6 forensic inspection vectors. Continuous biological dermis pore distribution and consistent sensor Photo-Response Non-Uniformity (PRNU) noise confirm authentic camera capture without generative manipulation.`,
      primaryArchitectureDetected: 'None (Authentic Optical Capture)',
      metrics: {
        facialBoundary: {
          id: 'm-facial',
          title: 'Facial Boundary & Warping',
          score: 4,
          status: 'nominal',
          verdict: 'Continuous Dermal Anatomy',
          details: 'Natural transitions across epidermis, hair, and background optics with zero blending seams.',
          evidence: [
            'Warping divergence index: 0.05 (Nominal < 0.15)',
            'Uniform skin pore depth across facial quadrants',
            'Standard optical motion blur conforming to exposure parameters'
          ]
        },
        frequencySpectral: {
          id: 'm-fft',
          title: '2D-FFT Spectral Harmonics',
          score: 3,
          status: 'nominal',
          verdict: 'Natural 1/f Gradient Decay',
          details: 'Continuous radial Fourier spectrum conforming to physical camera lens transfer function.',
          evidence: [
            'No periodic lattice peaks found across all frequency bands',
            'Natural CMOS sensor Poisson-Gaussian noise present',
            'Spectral slope: -2.2 dB/octave (Authentic baseline)'
          ]
        },
        eyeDynamics: {
          id: 'm-eye',
          title: 'Corneal Reflections & Gaze',
          score: 2,
          status: 'nominal',
          verdict: 'Physiologically Coherent',
          details: 'Corneal highlights strictly follow ray-traced geometric consistency with scene illumination.',
          evidence: [
            'Bilateral pupil convergence index: 0.98',
            'Saccadic velocity matches human oculomotor physiology',
            'Natural vascular patterns verified in scleral tissue'
          ]
        },
        lightingConsistency: {
          id: 'm-light',
          title: '3D Illumination Vector Field',
          score: 3,
          status: 'nominal',
          verdict: 'Physically Unified Illumination',
          details: 'Harmonic shading and subsurface dermal scattering conform to physical environmental optics.',
          evidence: [
            'Spherical harmonics irradiance disparity: 0.09',
            'Consistent shadow penumbra across nose, jaw, and background',
            'Natural diffuse Fresnel reflectance on epidermal boundaries'
          ]
        },
        audioVisualSync: {
          id: 'm-av',
          title: 'Phonetic Lip-Audio Synchrony',
          score: 2,
          status: 'nominal',
          verdict: file.type === 'video' ? 'Precise Phoneme-Viseme Sync' : 'Nominal Optical Capture',
          details: file.type === 'video' 
            ? 'Acoustic vocal tract resonance aligns with muscular motion within 3ms.' 
            : 'Still image evaluation; optical capture validated.',
          evidence: file.type === 'video' ? [
            'SyncNet confidence score: +8.4 (High confidence authentic)',
            'Natural bilabial pressure release preceding plosives',
            'Muscular orbicularis tension corresponds to vocal volume'
          ] : [
            'Optical capture validated across sensor planes'
          ]
        },
        metadataForensics: {
          id: 'm-meta',
          title: 'Container & Compression Forensics',
          score: 2,
          status: 'nominal',
          verdict: 'Consistent Encoder Architecture',
          details: 'Standard single-pass hardware quantization tables and intact container structure.',
          evidence: [
            'Authentic camera encoder atom markers present',
            'Uniform macroblock boundary distribution',
            'Zero ghost DCT quantization traces'
          ]
        }
      },
      spectralBands: [
        { band: 'Low Band (0–2 kHz)', frequency: '0.4 kHz', power: 90, expected: 90, delta: 0, hasArtifact: false },
        { band: 'Mid-Low (2–6 kHz)', frequency: '4.2 kHz', power: 66, expected: 65, delta: 1, hasArtifact: false },
        { band: 'Mid-High (6–10 kHz)', frequency: '8.1 kHz', power: 42, expected: 43, delta: -1, hasArtifact: false },
        { band: 'High Band (10–14 kHz)', frequency: '12.4 kHz', power: 24, expected: 25, delta: -1, hasArtifact: false },
        { band: 'Nyquist Limit (14–16 kHz)', frequency: '15.2 kHz', power: 10, expected: 11, delta: -1, hasArtifact: false },
      ],
      telemetryLogs: [
        { timestamp: '00:00.009', stage: 'INGEST', message: `Stream loaded: ${file.name} (${file.sizeFormatted})`, level: 'info' },
        { timestamp: '00:00.180', stage: 'SENSOR_PRNU', message: 'Extracted sensor noise confirms genuine CMOS silicon pattern', level: 'success' },
        { timestamp: '00:00.490', stage: 'FFT_2D', message: 'Continuous Fourier spectral decay verified without lattice peaks', level: 'success' },
        { timestamp: '00:00.820', stage: 'BIOMETRICS', message: 'Ocular specular reflections strictly align with scene lighting', level: 'success' },
        { timestamp: '00:01.110', stage: 'QUANT_DCT', message: 'Single-pass uniform quantization matrix validated', level: 'success' },
        { timestamp: '00:01.350', stage: 'ENSEMBLE', message: `Final verdict: ${confidence}% AUTHENTIC HUMAN MEDIA`, level: 'success' }
      ]
    };
  }
}
