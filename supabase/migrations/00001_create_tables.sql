-- VK_OS Portfolio — Supabase Schema Migration
-- Creates all tables inferred from the 9-collection content system.
-- Each collection has its own table with typed columns matching MDX frontmatter.

-- ============================================
-- PROJECTS
-- ============================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  level INTEGER NOT NULL DEFAULT 50,
  tech_stack JSONB NOT NULL DEFAULT '[]',
  thumbnail TEXT,
  live_url TEXT,
  github_url TEXT,
  stats JSONB,
  featured BOOLEAN NOT NULL DEFAULT false,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_slug ON projects (slug);
CREATE INDEX idx_projects_featured ON projects (featured) WHERE featured = true;
CREATE INDEX idx_projects_category ON projects (category);
CREATE INDEX idx_projects_date ON projects (date DESC);

-- ============================================
-- BLOGS
-- ============================================
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  tags JSONB NOT NULL DEFAULT '[]',
  published BOOLEAN NOT NULL DEFAULT true,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blogs_slug ON blogs (slug);
CREATE INDEX idx_blogs_published ON blogs (published) WHERE published = true;
CREATE INDEX idx_blogs_date ON blogs (date DESC);

-- ============================================
-- CERTIFICATIONS
-- ============================================
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL DEFAULT '',
  rarity TEXT NOT NULL DEFAULT 'common',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL DEFAULT 'certification',
  skills JSONB NOT NULL DEFAULT '[]',
  hours INTEGER,
  credential_id TEXT,
  credential_url TEXT,
  pdf_url TEXT,
  image_url TEXT,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_certifications_slug ON certifications (slug);
CREATE INDEX idx_certifications_rarity ON certifications (rarity);
CREATE INDEX idx_certifications_date ON certifications (date DESC);

-- ============================================
-- NOTES (uses subject-based unique constraint)
-- ============================================
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  "order" INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  type TEXT NOT NULL DEFAULT 'mdx',
  file_url TEXT,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(slug, subject)
);

CREATE INDEX idx_notes_subject ON notes (subject);
CREATE INDEX idx_notes_published ON notes (published) WHERE published = true;
CREATE INDEX idx_notes_order ON notes ("order");

-- ============================================
-- MISSIONS
-- ============================================
CREATE TABLE missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'community',
  xp INTEGER NOT NULL DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT true,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_missions_slug ON missions (slug);
CREATE INDEX idx_missions_type ON missions (type);
CREATE INDEX idx_missions_date ON missions (date DESC);

-- ============================================
-- HACKATHONS
-- ============================================
CREATE TABLE hackathons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  position TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Regional',
  team_size INTEGER NOT NULL DEFAULT 1,
  project_name TEXT,
  technologies JSONB NOT NULL DEFAULT '[]',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  prize TEXT,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_hackathons_slug ON hackathons (slug);
CREATE INDEX idx_hackathons_category ON hackathons (category);
CREATE INDEX idx_hackathons_date ON hackathons (date DESC);

-- ============================================
-- INTERNSHIPS
-- ============================================
CREATE TABLE internships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Completed',
  duration TEXT NOT NULL DEFAULT '',
  start_date DATE,
  end_date DATE,
  skills JSONB NOT NULL DEFAULT '[]',
  hours INTEGER NOT NULL DEFAULT 0,
  certificate_url TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_internships_slug ON internships (slug);
CREATE INDEX idx_internships_company ON internships (company);
CREATE INDEX idx_internships_status ON internships (status);
CREATE INDEX idx_internships_date ON internships (date DESC);

-- ============================================
-- LEADERSHIP
-- ============================================
CREATE TABLE leadership (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  organization TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  start_date DATE,
  end_date DATE,
  impact TEXT NOT NULL DEFAULT '',
  people_impacted INTEGER NOT NULL DEFAULT 0,
  events_conducted INTEGER NOT NULL DEFAULT 0,
  volunteers_managed INTEGER NOT NULL DEFAULT 0,
  initiative_type TEXT NOT NULL DEFAULT '',
  xp INTEGER NOT NULL DEFAULT 0,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leadership_slug ON leadership (slug);
CREATE INDEX idx_leadership_organization ON leadership (organization);
CREATE INDEX idx_leadership_xp ON leadership (xp DESC);
CREATE INDEX idx_leadership_date ON leadership (date DESC);

-- ============================================
-- MEDIA
-- ============================================
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT '',
  publication TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  url TEXT,
  thumbnail TEXT,
  description TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_media_slug ON media (slug);
CREATE INDEX idx_media_type ON media (type);
CREATE INDEX idx_media_date ON media (date DESC);

-- ============================================
-- CERTIFICATES (uses issuer-based composite unique)
-- ============================================
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'certification',
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  skills JSONB NOT NULL DEFAULT '[]',
  hours INTEGER,
  credential_id TEXT,
  verification_url TEXT,
  certificate_pdf_url TEXT,
  thumbnail_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(slug, issuer)
);

CREATE INDEX idx_certificates_slug ON certificates (slug);
CREATE INDEX idx_certificates_issuer ON certificates (issuer);
CREATE INDEX idx_certificates_published ON certificates (published) WHERE published = true;
CREATE INDEX idx_certificates_featured ON certificates (featured) WHERE featured = true;
CREATE INDEX idx_certificates_date ON certificates (date DESC);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certifications_updated_at
  BEFORE UPDATE ON certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON notes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_missions_updated_at
  BEFORE UPDATE ON missions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hackathons_updated_at
  BEFORE UPDATE ON hackathons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_internships_updated_at
  BEFORE UPDATE ON internships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leadership_updated_at
  BEFORE UPDATE ON leadership FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_updated_at
  BEFORE UPDATE ON media FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON certificates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Public read: published content only
CREATE POLICY "Public can read published projects"
  ON projects FOR SELECT USING (true);

CREATE POLICY "Public can read published blogs"
  ON blogs FOR SELECT USING (published = true);

CREATE POLICY "Public can read all certifications"
  ON certifications FOR SELECT USING (true);

CREATE POLICY "Public can read published notes"
  ON notes FOR SELECT USING (published = true);

CREATE POLICY "Public can read all missions"
  ON missions FOR SELECT USING (true);

CREATE POLICY "Public can read all hackathons"
  ON hackathons FOR SELECT USING (true);

CREATE POLICY "Public can read all internships"
  ON internships FOR SELECT USING (true);

CREATE POLICY "Public can read all leadership"
  ON leadership FOR SELECT USING (true);

CREATE POLICY "Public can read all media"
  ON media FOR SELECT USING (true);

CREATE POLICY "Public can read published certificates"
  ON certificates FOR SELECT USING (published = true);

-- Admin full access via service_role key
CREATE POLICY "Admin full access projects"
  ON projects FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access blogs"
  ON blogs FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access certifications"
  ON certifications FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access notes"
  ON notes FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access missions"
  ON missions FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access hackathons"
  ON hackathons FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access internships"
  ON internships FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access leadership"
  ON leadership FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access media"
  ON media FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access certificates"
  ON certificates FOR ALL USING (true) WITH CHECK (true);
