# New Endpoint Requirement: Service Sub-Services

## 1. Executive Summary
This document specifies the backend API data contract and schema requirements for servicing the **Sub-Services** section within the **Service Detail Page**. 

The frontend dynamically displays up to a **maximum of 6 sub-services** per service category using an asymmetrical staggered layout.

---

## 2. API Endpoint Specification

### `GET /api/services/{slug}`
*(Or dedicated sub-resources endpoint: `GET /api/services/{slug}/sub-services`)*

### Required JSON Field: `sub_services`
The service endpoint payload must return a `sub_services` array containing between **1 to 6 items**.

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "slug": "e-sports-arena-broadcast",
    "title": "E-Sports & Arena Broadcast",
    "sub_title": "Live Production • Arena Visuals • Real-Time Telemetry",
    "featured_image": "/storage/services/hero.jpg",
    "description": "Engineered for maximum crowd excitement. We design end-to-end stadium broadcast graphics...",
    "sub_services": [
      {
        "id": 101,
        "title": "Broadcast Telemetry & Real-Time HUDs",
        "description": "Our custom software integrations hook directly into match servers and observer APIs to render frame-accurate health bars, player stats, kill feeds, and mini-map overlays in real time.",
        "image": "/storage/sub-services/hud-telemetry.jpg"
      },
      {
        "id": 102,
        "title": "Stadium Screen Control & Multi-Display Sync",
        "description": "Synchronize main arena LED walls, side banners, player podium lights, and broadcast feeds under unified master triggers for stadium-wide celebrations.",
        "image": "/storage/sub-services/led-sync.jpg"
      },
      {
        "id": 103,
        "title": "Instant Replay & High-Voltage Stingers",
        "description": "Low-latency multi-angle replay triggers paired with custom branded graphics stingers engineered for clutch championship match moments.",
        "image": "/storage/sub-services/instant-replay.jpg"
      },
      {
        "id": 104,
        "title": "Match Server Data Socket Connectors",
        "description": "Direct websocket data pipelines pulling live gold diffs, ultimate charge status, and player economy stats into dynamic automated graphics.",
        "image": "/storage/sub-services/socket-connectors.jpg"
      },
      {
        "id": 105,
        "title": "Arena Audio & Cue Signal Automation",
        "description": "Spatial sound triggers, sub-bass risers, and lighting DMX commands executed automatically in sync with live match events.",
        "image": "/storage/sub-services/audio-automation.jpg"
      },
      {
        "id": 106,
        "title": "Observer Deck & Control Hardware Rigs",
        "description": "Turnkey operator desks, custom keypads, and NDI/SDI signal matrices pre-configured for seamless broadcast truck deployment.",
        "image": "/storage/sub-services/hardware-deck.jpg"
      }
    ]
  }
}
```

---

## 3. Sub-Services Data Schema

| Field Name | Type | Required | Max Length / Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `integer` \| `string` | **Yes** | — | Unique identifier for the sub-service |
| `title` | `string` | **Yes** | Max 100 chars | Title of the sub-service module |
| `description` | `string` | **Yes** | Max 300 chars | Concise summary description of capabilities |
| `image` | `string` | **Yes** | Valid Image URL / Path | Preview image URL (Recommended ratio 16:10, e.g. 1280x800) |

> **Constraint Rule**: Minimum 1 item, **maximum 6 items**. The frontend automatically slices to a max of 6 items (`sub_services.slice(0, 6)`).

---

## 4. Default Content Catalog Reference (Max 6 Items Per Service)

### Service 1: `e-sports-arena-broadcast`
1. **Broadcast Telemetry & Real-Time HUDs**
   - **Image**: `/assets/dummyimghl/dummyimghl1.jpeg`
   - **Description**: Our custom software integrations hook directly into match servers and observer APIs to render frame-accurate health bars, player stats, kill feeds, and mini-map overlays in real time.
2. **Stadium Screen Control & Multi-Display Sync**
   - **Image**: `/assets/dummyimghl/dummyimghl2.jpg`
   - **Description**: Synchronize main arena LED walls, side banners, player podium lights, and broadcast feeds under unified master triggers for stadium-wide celebrations.
3. **Instant Replay & High-Voltage Stingers**
   - **Image**: `/assets/dummyimghl/dummyimghl3.jpg`
   - **Description**: Low-latency multi-angle replay triggers paired with custom branded graphics stingers engineered for clutch championship match moments.
4. **Match Server Data Socket Connectors**
   - **Image**: `/assets/dummyimghl/dummyimghl4.jpg`
   - **Description**: Direct websocket data pipelines pulling live gold diffs, ultimate charge status, and player economy stats into dynamic automated graphics.
5. **Arena Audio & Cue Signal Automation**
   - **Image**: `/assets/dummyimghl/dummyimghl5.jpg`
   - **Description**: Spatial sound triggers, sub-bass risers, and lighting DMX commands executed automatically in sync with live match events.
6. **Observer Deck & Control Hardware Rigs**
   - **Image**: `/assets/dummyimghl/dummyimghl6.jpg`
   - **Description**: Turnkey operator desks, custom keypads, and NDI/SDI signal matrices pre-configured for seamless broadcast truck deployment.

---

### Service 2: `brand-experiences-motion`
1. **Kinetic Graphic Toolkits**
   - **Image**: `/assets/dummyimghl/dummyimghl2.jpg`
   - **Description**: Modular 2D/3D visual assets, stingers, lower-thirds, lower-screen tickers, and commercial transitions designed for seamless multi-channel broadcast deployment.
2. **Opening Ceremony Visual Packages**
   - **Image**: `/assets/dummyimghl/dummyimghl4.jpg`
   - **Description**: Full intro reveal sequences, player walkout animations, and sound-synced kinetic typography loops that set the tone before the first match kicks off.
3. **3D Logo & Trophy Reveal Animations**
   - **Image**: `/assets/dummyimghl/dummyimghl5.jpg`
   - **Description**: Photorealistic 3D rendered logo reveals and dynamic digital trophy animations designed for high-resolution stadium LED screens.
4. **Stream Overlays & Social Media Toolkits**
   - **Image**: `/assets/dummyimghl/dummyimghl1.jpeg`
   - **Description**: Twitch/YouTube stream graphics, animated starting-soon screens, commercial loopers, and social media clip templates.
5. **Event Spatial Signage & Dynamic Banners**
   - **Image**: `/assets/dummyimghl/dummyimghl3.jpg`
   - **Description**: High-res motion loops tailored for stadium ribbon boards, concourse video walls, and entrance LED archways.
6. **Motion Brand Guidelines & Specs**
   - **Image**: `/assets/dummyimghl/dummyimghl6.jpg`
   - **Description**: Comprehensive animation rules, color palettes, font behaviors, and file export presets for international commentary teams.

---

### Service 3: `3d-stage-vfx-animation`
1. **Real-Time Virtual Environments (xR)**
   - **Image**: `/assets/dummyimghl/dummyimghl3.jpg`
   - **Description**: Unreal Engine 5 virtual stages dynamically matching physical camera perspectives live on air, placing commentators inside futuristic battle arenas.
2. **Stadium Floor Projection Mapping**
   - **Image**: `/assets/dummyimghl/dummyimghl1.jpeg`
   - **Description**: Transforming physical arena floors into animated battlegrounds with high-lumen projection mapping synchronized to player actions.
3. **Camera Tracking System Calibration**
   - **Image**: `/assets/dummyimghl/dummyimghl6.jpg`
   - **Description**: Mo-Sys and Stype optical tracking integration locking virtual 3D camera angles to physical broadcast cranes with zero latency.
4. **Interactive DMX Lighting Automation**
   - **Image**: `/assets/dummyimghl/dummyimghl2.jpg`
   - **Description**: DMX and Art-Net lighting protocol integration syncing stage moving heads and LED strobes to real-time Unreal Engine VFX triggers.
5. **AR Holographic Player Avatars**
   - **Image**: `/assets/dummyimghl/dummyimghl4.jpg`
   - **Description**: Augmented reality player avatars projected onto live broadcast feeds for high-impact player introductions during finals.
6. **Photorealistic Environment Design**
   - **Image**: `/assets/dummyimghl/dummyimghl5.jpg`
   - **Description**: Custom 3D shaders, dynamic weather effects, cinematic lighting, and custom mesh modeling built natively inside Unreal Engine.

---

### Service 4: `interactive-web-audio`
1. **3D WebGL Tournament Portals**
   - **Image**: `/assets/dummyimghl/dummyimghl4.jpg`
   - **Description**: Custom web portals featuring real-time 3D product showcases, interactive tournament schedules, fan vote systems, and live leaderboards.
2. **Spatial Audio & Sound Design**
   - **Image**: `/assets/dummyimghl/dummyimghl5.jpg`
   - **Description**: Custom tournament sound effects, transition risers, anthem bass drops, and spatial soundscapes engineered for stadium speaker systems.
3. **Real-Time Fan Voting & Predictors**
   - **Image**: `/assets/dummyimghl/dummyimghl2.jpg`
   - **Description**: Live spectator polling widgets and interactive match prediction leaderboards displayed live on stream and arena screens.
4. **Interactive Mobile Venue Companion**
   - **Image**: `/assets/dummyimghl/dummyimghl3.jpg`
   - **Description**: Mobile web app allowing fans in attendance to sync their phone screens with stadium LED shows for crowd light shows.
5. **Custom Audio Anthem & Stems Package**
   - **Image**: `/assets/dummyimghl/dummyimghl1.jpeg`
   - **Description**: Bespoke broadcast soundtrack package containing intro anthems, victory stabs, countdown beats, and commercial audio stems.
6. **Interactive Bracket & Tournament Trees**
   - **Image**: `/assets/dummyimghl/dummyimghl6.jpg`
   - **Description**: Dynamic web-based tournament brackets with live status updates, match stats tooltips, and player head-to-head comparisons.

---

### Service 5: `global-tournament-branding`
1. **Championship Identity & Design System**
   - **Image**: `/assets/dummyimghl/dummyimghl5.jpg`
   - **Description**: End-to-end visual identity covering tournament logos, typography guidelines, stage geometry standards, and broadcast graphic systems.
2. **Arena Spatial & Wayfinding Design**
   - **Image**: `/assets/dummyimghl/dummyimghl6.jpg`
   - **Description**: Stadium entrance wraps, player tunnel murals, VIP lounge aesthetics, ticket booth graphics, and fan zone spatial branding.
3. **Victory & Trophy Ceremony Production**
   - **Image**: `/assets/dummyimghl/dummyimghl1.jpeg`
   - **Description**: Pyro-synced screen graphics, confetti blast visuals, victory screen animations, and champion trophy reveal sequences.
4. **Broadcast Operations & Control Toolkit**
   - **Image**: `/assets/dummyimghl/dummyimghl3.jpg`
   - **Description**: Pre-configured graphic packages and operator decks ready for global multi-language commentary teams and broadcast trucks.
5. **Player Apparel & Merch Graphic Assets**
   - **Image**: `/assets/dummyimghl/dummyimghl2.jpg`
   - **Description**: Team jersey graphics, tournament staff apparel badges, and merchandise artwork engineered for physical printing and digital promotion.
6. **Sponsor Integration & LED Ribbon Guidelines**
   - **Image**: `/assets/dummyimghl/dummyimghl4.jpg`
   - **Description**: Modular sponsor logo lockups, animated LED ribbon board templates, and commercial breakdown stingers optimized for high visibility.

---

## 5. Filament Admin Resource Recommendation (Laravel Backend)

To manage sub-services in Filament Admin, implement a `Repeater` component inside `ServicesForm.php`:

```php
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;

Repeater::make('sub_services')
    ->label('Sub-Services (Max 6 Modules)')
    ->schema([
        TextInput::make('title')
            ->required()
            ->maxLength(100),
        Textarea::make('description')
            ->required()
            ->rows(3)
            ->maxLength(300),
        FileUpload::make('image')
            ->image()
            ->directory('sub-services')
            ->required(),
    ])
    ->minItems(1)
    ->maxItems(6)
    ->collapsible();
```
