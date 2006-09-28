#ifndef _ps_CLogger_H
#define _ps_CLogger_H

#include <fstream>
#include <string>
#include <set>

class CLogger;
extern CLogger* g_Logger;

#define LOG (g_Logger->Log)
#define LOG_ONCE (g_Logger->LogOnce)

enum ELogMethod
{
	NORMAL,
	MESSAGE = NORMAL,
	ERROR,
	WARNING
};

class CLogger
{
public:
	
	// Default constructor - outputs to normal log files
	CLogger();

	// Special constructor (mostly for testing) - outputs to provided streams.
	// Takes ownership of streams and will delete them in the destructor.
	CLogger(std::ostream* mainLog, std::ostream* interestingLog);

	~CLogger();

	//Functions to write different message types
	void WriteMessage(const char *message, int interestedness);
	void WriteError  (const char *message, int interestedness);
	void WriteWarning(const char *message, int interestedness);
	
	//Function to log stuff to file
	void Log(ELogMethod method, const char* category, const char *fmt, ...);
	//Similar to Log, but only outputs each message once no matter how many times it's called
	void LogOnce(ELogMethod method, const char* category, const char *fmt, ...);
	
private:
	void Init();

	void LogUsingMethod(ELogMethod method, const char* category, const char* message);

	//the output streams
	std::ostream* m_MainLog;
	std::ostream* m_InterestingLog;

	//vars to hold message counts
	int m_NumberOfMessages;
	int m_NumberOfErrors;
	int m_NumberOfWarnings;

	// Returns how interesting this category is to the user
	// (0 = no messages, 1(default) = warnings/errors, 2 = all)
	int Interestedness(const char* category);

	// Used to remember LogOnce messages
	std::set<std::string> m_LoggedOnce;

	NO_COPY_CTOR(CLogger);
};

#endif
