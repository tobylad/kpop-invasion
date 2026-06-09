export type BandGender = 'boy_group' | 'girl_group';

export interface Band {
  id: string;
  name: string;
  koreanName: string;
  gender: BandGender;
  debutDate: string;
  agency: string;
  fandomName: string;
  logoUrl: string;
  memberIds: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BandPosition =
  | 'main_vocalist' | 'lead_vocalist'
  | 'main_dancer'   | 'lead_dancer'
  | 'main_rapper'   | 'lead_rapper'
  | 'visual'        | 'center'
  | 'leader'        | 'maknae';

export interface Member {
  id: string;
  bandId: string;
  stageName: string;
  koreanName: string;
  legalName: string;
  dateOfBirth: string;
  nationality: string;
  positions: BandPosition[];
  profileImageUrl: string;
  soloProfileId: string | null;
  contractId: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SocialHandles {
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
  weibo?: string;
  bubble?: string;
}

export interface SoloProfile {
  id: string;
  memberId: string;
  soloStageName: string;
  bio: string;
  genres: string[];
  releaseIds: string[];
  endorsementIds: string[];
  socialHandles: SocialHandles;
  createdAt: string;
  updatedAt: string;
}

export type ReleaseType =
  | 'full_album'
  | 'mini_album'
  | 'single_album'
  | 'digital_single'
  | 'repackage'
  | 'collaboration';

export interface Track {
  trackNumber: number;
  title: string;
  durationSec: number;
  isTitleTrack: boolean;
  mvUrl?: string;
  mvViewCount?: number;
}

export interface Release {
  id: string;
  bandId: string;
  memberId: string | null;
  title: string;
  koreanTitle: string | null;
  type: ReleaseType;
  releaseDate: string;
  coverArtUrl: string;
  tracks: Track[];
  era: string;
  createdAt: string;
}

export type SalesSource = 'hanteo' | 'gaon' | 'circle' | 'internal';

export interface AlbumSales {
  id: string;
  releaseId: string;
  bandId: string;
  reportedAt: string;
  source: SalesSource;
  physicalUnits: number;
  digitalUnits: number;
  totalUnits: number;
  revenueUSD: number;
  territoryBreakdown?: Record<string, number>;
}

export type ChartName =
  | 'melon_daily'       | 'melon_realtime'
  | 'gaon_digital'      | 'gaon_physical'
  | 'billboard_hot100'  | 'billboard_global'
  | 'spotify_global'    | 'apple_music_global'
  | 'youtube_trending';

export interface ChartEntry {
  id: string;
  releaseId: string;
  trackTitle: string;
  chart: ChartName;
  position: number;
  peakPosition: number;
  weeksOnChart: number;
  chartDate: string;
}

export type SocialPlatform =
  | 'instagram' | 'tiktok'
  | 'twitter'   | 'youtube'
  | 'weibo'     | 'vlive';

export interface PlatformMetrics {
  platform: SocialPlatform;
  followers: number;
  followersGrowth: number;
  engagementRate: number;
  impressions?: number;
  trendingTopics?: string[];
}

export interface SocialSnapshot {
  id: string;
  bandId: string;
  memberId?: string;
  releaseId?: string;
  snapshotAt: string;
  platforms: PlatformMetrics[];
}

export type VenueType =
  | 'arena'        | 'stadium'
  | 'concert_hall' | 'club'
  | 'outdoor'      | 'festival_grounds'
  | 'tv_studio'    | 'showcase_hall';

export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  address: string;
  city: string;
  country: string;
  timezone: string;
  capacity: number;
  isOutdoor: boolean;
  contactEmail: string;
  websiteUrl?: string;
  notes?: string;
  createdAt: string;
}

export type EventType =
  | 'concert'          | 'fan_meeting'
  | 'music_show'       | 'award_show'
  | 'press_conference' | 'interview'
  | 'photoshoot'       | 'mv_shoot'
  | 'showcase'         | 'rehearsal'
  | 'travel'           | 'rest_day'
  | 'endorsement_shoot';

export type EventStatus =
  | 'scheduled' | 'confirmed'
  | 'completed' | 'cancelled'
  | 'postponed' | 'at_risk';

export interface ScheduleEvent {
  id: string;
  bandId: string;
  title: string;
  type: EventType;
  status: EventStatus;
  startDatetime: string;
  endDatetime: string;
  venueId?: string;
  memberIds?: string[];
  releaseId?: string;
  incidentIds: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type IncidentCategory = 'personal' | 'venue' | 'operational';

export type PersonalSubtype =
  | 'illness'
  | 'injury'
  | 'mental_health_leave'
  | 'personal_leave'
  | 'visa_issue'
  | 'travel_delay';

export type VenueSubtype =
  | 'weather_event'
  | 'structural_damage'
  | 'power_failure'
  | 'permit_revoked'
  | 'double_booking'
  | 'safety_violation';

export type OperationalSubtype =
  | 'promoter_cancellation'
  | 'sponsor_withdrawal'
  | 'broadcast_schedule_conflict'
  | 'public_safety_advisory'
  | 'force_majeure';

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentStatus   = 'open' | 'monitoring' | 'resolved';

export interface Incident {
  id: string;
  category: IncidentCategory;
  subtype: PersonalSubtype | VenueSubtype | OperationalSubtype;
  severity: IncidentSeverity;
  status: IncidentStatus;
  title: string;
  description: string;
  memberId?: string;
  venueId?: string;
  affectedEventIds: string[];
  occurredAt: string;
  resolvedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type HealthRecordType =
  | 'routine_checkup'
  | 'fitness_assessment'
  | 'mental_health_session'
  | 'dietary_review'
  | 'specialist_referral'
  | 'follow_up';

export interface HealthRecord {
  id: string;
  memberId: string;
  type: HealthRecordType;
  date: string;
  provider: string;
  summary: string;
  flagged: boolean;
  linkedIncidentId?: string | null;
  nextReviewDate?: string | null;
  createdAt: string;
}

export type ContractStatus = 'active' | 'expired' | 'under_negotiation' | 'terminated';

export interface RevenueSplit {
  albumPercent: number;
  concertPercent: number;
  endorsementPercent: number;
  merchandisePercent: number;
  soloPercent?: number;
}

export interface Contract {
  id: string;
  memberId: string;
  bandId: string;
  status: ContractStatus;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  revenueSplit: RevenueSplit;
  clauses: string[];
  documentUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type EndorsementStatus = 'active' | 'completed' | 'negotiating' | 'cancelled';

export interface Endorsement {
  id: string;
  brandName: string;
  status: EndorsementStatus;
  bandId?: string;
  memberId?: string;
  startDate: string;
  endDate: string;
  dealValueUSD: number;
  deliverables: string[];
  exclusivityTerms?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type FaceExpression = 'neutral' | 'happy' | 'tired' | 'focused' | 'stressed' | 'proud';
export type StatusOverlay  = 'sick' | 'injured' | 'resting' | 'on_leave' | null;

export interface MemberAppearance {
  memberId: string;
  faceModelId: string;
  gender: 'male' | 'female';
  expression: FaceExpression;
  statusOverlay: StatusOverlay;
  updatedAt: string;
}

export type WorldEventCategory =
  | 'chart' | 'sales' | 'social'
  | 'venue' | 'member' | 'schedule'
  | 'milestone';

export type WorldEventTone = 'positive' | 'negative' | 'neutral' | 'warning';

export interface WorldEvent {
  id: string;
  gameDate: string;
  category: WorldEventCategory;
  tone: WorldEventTone;
  message: string;
  bandId: string;
  memberId?: string | null;
  venueId?: string | null;
  releaseId?: string | null;
  incidentId?: string | null;
  spawnsInbox: boolean;
  inboxMessageId?: string | null;
  createdAt: string;
}

export type InboxSender = 'member' | 'label' | 'promoter' | 'venue' | 'pr_team' | 'system';
export type MessageStatus = 'unread' | 'read' | 'responded' | 'expired';

export interface GameEffect {
  entity: 'member' | 'scheduleEvent' | 'contract' | 'venue';
  entityId: string;
  field: string;
  value: unknown;
}

export interface ResponseOption {
  id: string;
  label: string;
  outcome: string;
  effects: GameEffect[];
}

export interface InboxMessage {
  id: string;
  gameDate: string;
  senderType: InboxSender;
  senderName: string;
  senderId?: string | null;
  subject: string;
  body: string;
  status: MessageStatus;
  responseOptions: ResponseOption[];
  chosenResponseId?: string | null;
  expiresOnDate?: string | null;
  worldEventId?: string | null;
  createdAt: string;
}

export type TimeIncrement = 'day' | 'week';

export interface GameState {
  id: string;
  bandId: string;
  currentDate: string;
  startDate: string;
  timeIncrement: TimeIncrement;
  unreadInboxCount: number;
  openIncidentCount: number;
  atRiskEventCount: number;
  lastAdvancedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface DbSchema {
  bands: Band[];
  members: Member[];
  soloProfiles: SoloProfile[];
  releases: Release[];
  albumSales: AlbumSales[];
  chartEntries: ChartEntry[];
  socialSnapshots: SocialSnapshot[];
  venues: Venue[];
  scheduleEvents: ScheduleEvent[];
  incidents: Incident[];
  healthRecords: HealthRecord[];
  contracts: Contract[];
  endorsements: Endorsement[];
  memberAppearances: MemberAppearance[];
  worldEvents: WorldEvent[];
  inboxMessages: InboxMessage[];
  gameState: GameState | null;
}
