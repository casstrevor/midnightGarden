import { useEffect, useState } from 'react'
import './App.css'

type Tab = 'home' | 'water' | 'climb' | 'light' | 'install'

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'water', label: 'Water', icon: '◌' },
  { id: 'climb', label: 'Climb', icon: '┊' },
  { id: 'light', label: 'Light', icon: '☼' },
  { id: 'install', label: 'Install', icon: '+' },
]

function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
    if (standalone) setInstalled(true)

    const onBip = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', onBip)
    window.addEventListener('appinstalled', () => setInstalled(true))
    return () => window.removeEventListener('beforeinstallprompt', onBip)
  }, [])

  async function installApp() {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const result = await deferredPrompt.userChoice
    if (result.outcome === 'accepted') setInstalled(true)
    setDeferredPrompt(null)
  }

  return (
    <div className="app">
      <div className="phone-shell">
        <header className="topbar">
          <span className="private-pill">Private · just for you</span>
          <span className="brand-mark">Midnight Garden</span>
        </header>

        <main className="screen" key={tab}>
          {tab === 'home' && <HomeScreen onContinue={() => setTab('water')} />}
          {tab === 'water' && <WaterScreen />}
          {tab === 'climb' && <ClimbScreen />}
          {tab === 'light' && <LightScreen />}
          {tab === 'install' && (
            <InstallScreen
              installed={installed}
              canPrompt={Boolean(deferredPrompt)}
              onInstall={installApp}
            />
          )}
        </main>

        <nav className="tabbar" aria-label="App sections">
          {tabs.map((item) => (
            <button
              key={item.id}
              className={tab === item.id ? 'tab active' : 'tab'}
              onClick={() => setTab(item.id)}
              aria-current={tab === item.id ? 'page' : undefined}
            >
              <span className="tab-icon" aria-hidden>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

function HomeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <section className="panel hero-panel">
      <div className="hero-visual">
        <img src="/leaf.svg" alt="" className="hero-leaf" />
        <div className="hero-glow" aria-hidden />
      </div>
      <p className="eyebrow">Your office cutting</p>
      <h1>Monstera deliciosa</h1>
      <p className="lede">
        Swiss cheese plant — currently rooting in water on your shelf. This
        personal app keeps the care steps in your pocket.
      </p>
      <ul className="snapshot">
        <li>
          <strong>Now</strong>
          <span>Water jar · weekly refresh</span>
        </li>
        <li>
          <strong>Next</strong>
          <span>Soil at 2–4″ roots</span>
        </li>
        <li>
          <strong>Light</strong>
          <span>White LED · 12–14 hrs</span>
        </li>
      </ul>
      <button className="primary-btn" onClick={onContinue}>
        Start with water → soil
      </button>
    </section>
  )
}

function WaterScreen() {
  return (
    <section className="panel">
      <p className="eyebrow">01 · Propagation</p>
      <h2>Water or soil?</h2>
      <p className="lede">
        Stay in water while roots form. Move to soil once they’re ready so the
        plant can climb and thicken up.
      </p>
      <div className="steps">
        <article>
          <h3>Keep in water</h3>
          <p>
            Change the water weekly. Keep nodes submerged and leaves in air.
            Clear glass helps you watch root growth.
          </p>
        </article>
        <article>
          <h3>Transfer cue</h3>
          <p>
            Pot up when white roots are <strong>2–4 inches</strong> long — not
            sooner, or the plant may stall.
          </p>
        </article>
        <article>
          <h3>Soil mix</h3>
          <p>
            Use chunky aroid mix: potting soil + perlite + orchid bark. Water
            when the top 1–2 inches feel dry.
          </p>
        </article>
      </div>
    </section>
  )
}

function ClimbScreen() {
  return (
    <section className="panel">
      <p className="eyebrow">02 · Support</p>
      <h2>Attach to a trellis</h2>
      <p className="lede">
        Monsteras are climbers. A moss pole or wood trellis gives bigger,
        more fenestrated leaves over time.
      </p>
      <div className="steps">
        <article>
          <h3>Place the support</h3>
          <p>
            Sink a moss pole or wood trellis deep in the pot, behind the stem,
            before the mix settles.
          </p>
        </article>
        <article>
          <h3>Loose ties</h3>
          <p>
            Secure the stem with soft velcro plant ties or twine every few
            inches. Never cinch tight or bend leaves hard.
          </p>
        </article>
        <article>
          <h3>Aerial roots</h3>
          <p>
            Gently guide aerial roots toward the pole so they can grip and
            drink humidity from the moss.
          </p>
        </article>
      </div>
    </section>
  )
}

function LightScreen() {
  return (
    <section className="panel">
      <p className="eyebrow">03 · Grow light</p>
      <h2>Light type & distance</h2>
      <p className="lede">
        Bright indirect light is the goal. Use a real grow spectrum — not the
        colorful decorative lamp beside the jar.
      </p>
      <div className="metric-row">
        <div className="metric">
          <span className="metric-label">Spectrum</span>
          <span className="metric-value">4000–6500K</span>
          <span className="metric-note">Full-spectrum white LED</span>
        </div>
        <div className="metric">
          <span className="metric-label">Schedule</span>
          <span className="metric-value">12–14 hrs</span>
          <span className="metric-note">Then 10–12 hrs dark</span>
        </div>
        <div className="metric">
          <span className="metric-label">Distance</span>
          <span className="metric-value">12–24 in</span>
          <span className="metric-note">Farther if leaves feel hot</span>
        </div>
      </div>
      <div className="steps">
        <article>
          <h3>Tune it</h3>
          <p>
            Start farther away. Move closer if growth looks leggy; back off if
            leaves bleach pale. Side lighting is fine — avoid one hot spot all
            day. An outlet timer helps.
          </p>
        </article>
      </div>
    </section>
  )
}

function InstallScreen({
  installed,
  canPrompt,
  onInstall,
}: {
  installed: boolean
  canPrompt: boolean
  onInstall: () => void
}) {
  return (
    <section className="panel">
      <p className="eyebrow">Personal install</p>
      <h2>Keep it only on your phone</h2>
      <p className="lede">
        This is a private progressive web app — not published to the App Store
        or Play Store. Install it to your home screen so only your devices use
        it.
      </p>

      {installed ? (
        <div className="status-banner ok">Already installed on this device.</div>
      ) : canPrompt ? (
        <button className="primary-btn" onClick={onInstall}>
          Install Midnight Garden
        </button>
      ) : (
        <div className="status-banner">Use the steps below for your phone.</div>
      )}

      <div className="steps">
        <article>
          <h3>iPhone (Safari)</h3>
          <p>
            Open this app URL → Share → <strong>Add to Home Screen</strong> →
            Add. It opens full-screen like a native app.
          </p>
        </article>
        <article>
          <h3>Android (Chrome)</h3>
          <p>
            Menu ⋮ → <strong>Install app</strong> or Add to Home screen. Launch
            from your app drawer anytime.
          </p>
        </article>
        <article>
          <h3>Stay private</h3>
          <p>
            Run it on your own machine or a private URL you don’t share. No
            accounts, no public listing — just your Monstera guide.
          </p>
        </article>
      </div>
    </section>
  )
}

export default App
