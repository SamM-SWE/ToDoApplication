const SPRING_API =
  'https://todoapplicationbackend-befs.onrender.com/api'

async function proxyRequest(
  request: Request,
  context: {
    params: Promise<{ path: string[] }>
  }
) {
  const { path } = await context.params


  
  const username = process.env.AUTH_USERNAME
  const password = process.env.AUTH_PASSWORD

  if (!username || !password) {
    console.error(
      'Missing AUTH_USERNAME or AUTH_PASSWORD'
    )

    return Response.json(
      { message: 'Server authentication is not configured.' },
      { status: 500 }
    )
  }

  const url =
    `${SPRING_API}/${path.join('/')}`

  const authorization =
    'Basic ' +
    Buffer.from(
      `${username}:${password}`
    ).toString('base64')

  const headers: HeadersInit = {
    Authorization: authorization,
  }

  const contentType =
    request.headers.get('content-type')

  if (contentType) {
    headers['Content-Type'] = contentType
  }

  const method = request.method

  const body =
    method === 'GET' || method === 'HEAD'
      ? undefined
      : await request.text()

  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
      cache: 'no-store',
    })

    const responseBody =
      await response.text()

    return new Response(responseBody, {
      status: response.status,
      headers: {
        'Content-Type':
          response.headers.get('content-type') ??
          'application/json',
      },
    })
  } catch (error) {
    console.error(
      'Spring proxy error:',
      error
    )

    return Response.json(
      {
        message:
          'Unable to communicate with Spring backend.',
      },
      { status: 500 }
    )
  }
}

type RouteContext = {
  params: Promise<{ path: string[] }>
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  return proxyRequest(request, context)
}

export async function POST(
  request: Request,
  context: RouteContext
) {
  return proxyRequest(request, context)
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  return proxyRequest(request, context)
}

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  return proxyRequest(request, context)
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  return proxyRequest(request, context)
}