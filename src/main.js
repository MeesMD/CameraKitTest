import { 
	bootstrapCameraKit,
	createMediaStreamSource,
	Transform2D,
} from '@snap/camera-kit'

(async function()){
	var cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzI4OTEwNTE0LCJzdWIiOiIzZjcyYTFhZi04OWM5LTQ0ZDUtOTk1OS1mM2NlN2JhY2I4NWF-U1RBR0lOR34yZTE4ZjI1OS00ZDJkLTQ4Y2MtOWUwOS1iNzIwNmI1ZDUzOTMifQ.X6FJhwhVlEpEGK0Nj4W51OUYwPvdSy0_UYozvgZMfSo'})

	const session = await cameraKit.createSession()
	document.getelementById('canvas').replaceWith(session.output.live)

	const { lenses } = await cameraKit.lensRepository.loadLensGroups(['c7c1a51a-f7bd-4f21-8dd1-6df59e4c40e0'])

	session.applyLens(lenses[0])

	let mediaStream = await navigator.mediaDevices.getUserMedia({ video:
		{ facingMode: 'environment' } 
	});

	const source = createMediaStreamSource(mediaStream, {
		cameraType: 'back'
	})

	await session.setSrouce(source)

	session.source.setRenderSize(window.innerWidth, window.innerHeight)

	session.play()
})();