/*
CButton
by Gustav Larsson
gee@pyro.nu
*/

//#include "stdafx."
#include "GUI.h"

// temp GeeTODO
#include "font.h"
#include "ogl.h"

using namespace std;

// Offsets
DECLARE_SETTINGS_INFO(SButtonSettings)

//-------------------------------------------------------------------
//  Implementation Macros
//-------------------------------------------------------------------
#define _GUI_ADD_OFFSET(type, str, var) GUI_ADD_OFFSET(CButton, SButtonSettings, m_Settings, type, str, var)

//-------------------------------------------------------------------
//  Constructor / Destructor
//-------------------------------------------------------------------
CButton::CButton()
{
	// Settings defaults !
	m_Settings.m_Disabled =				false;
	m_Settings.m_Font =					"null";
	m_Settings.m_Sprite =				"null";
	m_Settings.m_SpriteDisabled =		"null";
	m_Settings.m_SpriteOver =			"null";
	m_Settings.m_SpritePressed =		"null";
	m_Settings.m_TextAlign =			EAlign_Center;
//	m_Settings.m_TextColor =			CColor();
//	m_Settings.m_TextColorDisabled;
//	m_Settings.m_TextColorOver;
//	m_Settings.m_TextColorPressed;
	m_Settings.m_TextValign =			EValign_Center;
	m_Settings.m_ToolTip =				"null";
	m_Settings.m_ToolTipStyle =			"null";


	// Static! Only done once
	if (m_SettingsInfo.empty())
	{
		// Setup the base ones too
		SetupBaseSettingsInfo(m_SettingsInfo);

		// Setup the new ones
		_GUI_ADD_OFFSET("bool",		"disabled",				m_Disabled)
		_GUI_ADD_OFFSET("string",	"font",					m_Font)
		_GUI_ADD_OFFSET("string",	"sprite",				m_Sprite)
		_GUI_ADD_OFFSET("string",	"sprite-disabled",		m_SpriteDisabled)
		_GUI_ADD_OFFSET("string",	"sprite-over",			m_SpriteOver)
		_GUI_ADD_OFFSET("string",	"sprite-pressed",		m_SpritePressed)
		_GUI_ADD_OFFSET("align",	"textalign",			m_TextAlign)
		_GUI_ADD_OFFSET("color",	"textcolor",			m_TextColor)
		_GUI_ADD_OFFSET("color",	"textcolor-disabled",	m_TextColorDisabled)
		_GUI_ADD_OFFSET("color",	"textcolor-over",		m_TextColorOver)
		_GUI_ADD_OFFSET("color",	"textcolor-pressed",	m_TextColorPressed)
		_GUI_ADD_OFFSET("valign",	"textvalign",			m_TextValign)
		_GUI_ADD_OFFSET("string",	"tooltip",				m_ToolTip)
		_GUI_ADD_OFFSET("string",	"tooltip-style",		m_ToolTipStyle)
	}
}

CButton::~CButton()
{
}

void CButton::HandleMessage(const EGUIMessage &Message)
{
	// Important
	IGUIButtonBehavior::HandleMessage(Message);

	switch (Message)
	{
	case GUIM_PREPROCESS:
		break;

	case GUIM_POSTPROCESS:
		break;

	case GUIM_MOUSE_OVER:
		break;

	case GUIM_MOUSE_ENTER:
///		OUTPUT(GUIM_MOUSE_ENTER)
		break;

	case GUIM_MOUSE_LEAVE:
///		OUTPUT(GUIM_MOUSE_LEAVE)
		break;

	case GUIM_MOUSE_PRESS_LEFT:
///		OUTPUT(GUIM_MOUSE_PRESS_LEFT)
		break;

	case GUIM_MOUSE_RELEASE_LEFT:
///		OUTPUT(GUIM_MOUSE_RELEASE_LEFT)
		break;

	case GUIM_PRESSED:
		GetGUI()->TEMPmessage = "Button " + string((const TCHAR*)m_Name) + " was pressed!";
///		OUTPUT(GUIM_PRESSED);
		break;

	default:
		break;
	}
}

void CButton::Draw()
{
	if (m_MouseHovering)
	{
		if (m_Pressed)
			glColor3f(0.7f, 0.f, 0.f);
		else
			glColor3f(0,1,(float)m_BaseSettings.m_Size.pixel.right/300.f);
	}
	else
		glColor3f((float)m_BaseSettings.m_Size.pixel.right/300.f,0,1);

	////////// Gee: janwas, this is just temp to see it
	glDisable(GL_TEXTURE_2D);
	//////////

	glPushMatrix();
		glTranslatef(0.0f, 0.0f, GetBaseSettings().m_Z);

		// Do this
		glBegin(GL_QUADS);
		//glBegin(GL_TRIANGLES);
			//CRect ca = GetBaseSettings().m_Size.GetClientArea(CRect(0, 0, g_xres, g_yres));
			CRect ca = m_CachedActualSize;

			glVertex2i(ca.right, ca.bottom);
			glVertex2i(ca.left, ca.bottom);
			glVertex2i(ca.left, ca.top);
			glVertex2i(ca.right, ca.top);

/*			glVertex2i(GetBaseSettings().m_Size.right, GetBaseSettings().m_Size.bottom);
			glVertex2i(GetBaseSettings().m_Size.left, GetBaseSettings().m_Size.bottom);
			glVertex2i(GetBaseSettings().m_Size.left, GetBaseSettings().m_Size.top);
			glVertex2i(GetBaseSettings().m_Size.right, GetBaseSettings().m_Size.top);
*//*
			glVertex2i(GetBaseSettings().m_Size.right, GetBaseSettings().m_Size.bottom);
			glVertex2i(GetBaseSettings().m_Size.left, GetBaseSettings().m_Size.bottom);
			glVertex2i(GetBaseSettings().m_Size.left, GetBaseSettings().m_Size.top);
			//glVertex2i(GetBaseSettings().m_Size.right, GetBaseSettings().m_Size.top);
*/		glEnd();

		//glDisable(GL_DEPTH_TEST);

/*		glEnable(GL_TEXTURE_2D);
		glColor3f(1,1,1);
		
		//glLoadIdentity();
		//glTranslatef(ca.left + 10, g_yres - (ca.top + 10), GetBaseSettings().m_Z + 0.1f);
		glTranslatef(ca.left + 10, ca.top + 10, 0.0f);
		//glScalef(0,-1,0);
		font_bind(GetGUI()->TEMPfont);
		glprintf("%s", (const TCHAR*)m_Name);
*/		//glColor3f(0,0,0);
		//font.print(GetBaseSettings().m_Size.left + 3, GetBaseSettings().m_Size.top - 15, LEFT, "Object: %s", GetName().c_str());

		//glEnable(GL_DEPTH_TEST);

	glPopMatrix();
}
