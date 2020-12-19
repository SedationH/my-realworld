const cookieParser = require('cookieparser')
const parsed = cookieParser.parse(
  'user={%22id%22:127884%2C%22email%22:%22sedationh@gmail.com%22%2C%22createdAt%22:%222020-12-08T10:32:35.036Z%22%2C%22updatedAt%22:%222020-12-19T00:48:43.794Z%22%2C%22username%22:%22SedationH%22%2C%22bio%22:%22this%20is%20me%22%2C%22image%22:%22https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608348954917&di=2f56247114ef3a7115cf75945aa5ae87&imgtype=0&src=http%253A%252F%252Fb-ssl.duitang.com%252Fuploads%252Fitem%252F201508%252F18%252F20150818213048_vAdhz.jpeg%22%2C%22token%22:%22eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTI3ODg0LCJ1c2VybmFtZSI6IlNlZGF0aW9uSCIsImV4cCI6MTYxMzUzMTQ0NX0.b_-NrvuOV98SHXsBVB0dM45jjBbIAORDzzfKuJZgkR8%22}'
)

console.log(JSON.parse(parsed.user))
