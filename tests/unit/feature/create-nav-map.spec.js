import { execSync } from 'child_process'

describe('create:nav-map', () => {
  it('runs', () => {
    let output

    try {
      const suppressErrors = ['pipe', 'pipe', 'ignore']

      output = execSync('npm run create:nav-map', { stdio: suppressErrors })
    } catch (e) {
      output = false
    }

    expect(output).toBeTruthy()
  })
})
