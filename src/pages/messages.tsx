import { Context } from 'hono'
import { Header, PageWrapper, Card } from '../components/layout'

export const messagesPage = (c: Context) => {
  return c.render(
    <PageWrapper active="messages">
      <Header title="Messages" showBack={true} />
      
      <main class="px-4 py-4 space-y-4">
        {/* Search */}
        <div class="relative">
          <input 
            type="text" 
            placeholder="Search messages..." 
            class="w-full pl-10 pr-4 py-3 bg-white rounded-xl shadow-gs border-0 focus:ring-2 focus:ring-gs-gold outline-none"
          />
          <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        
        {/* Message Filters */}
        <div class="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Doctors', 'Support', 'System'].map((filter, idx) => (
            <button class={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${idx === 0 ? 'bg-gs-navy text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              {filter}
            </button>
          ))}
        </div>
        
        {/* Conversations List */}
        <div class="space-y-2">
          {[
            { 
              name: 'Dr. L. Weber', 
              role: 'Orthopedic Surgeon', 
              lastMessage: 'Your progress looks excellent! Keep up with the exercises.',
              time: '10:30 AM',
              unread: 2,
              online: true,
              avatar: 'fa-user-md'
            },
            { 
              name: 'S. Ahmed', 
              role: 'Care Coordinator', 
              lastMessage: 'Your accommodation for the wellness retreat has been confirmed.',
              time: 'Yesterday',
              unread: 0,
              online: true,
              avatar: 'fa-user'
            },
            { 
              name: 'Dr. A. Schmidt', 
              role: 'Nutritionist', 
              lastMessage: 'I\'ve updated your meal plan based on our last consultation.',
              time: 'Yesterday',
              unread: 1,
              online: false,
              avatar: 'fa-user-md'
            },
            { 
              name: 'M. Hassan', 
              role: 'Physiotherapist', 
              lastMessage: 'See you tomorrow at 9 AM for your session!',
              time: 'Mon',
              unread: 0,
              online: false,
              avatar: 'fa-user'
            },
            { 
              name: 'Dr. K. Müller', 
              role: 'Cardiologist', 
              lastMessage: 'Your ECG results are within normal range.',
              time: 'Oct 18',
              unread: 0,
              online: false,
              avatar: 'fa-user-md'
            },
            { 
              name: 'SelectCareOS Support', 
              role: 'System', 
              lastMessage: 'Your appointment reminder: Cardiology Consult tomorrow at 10 AM',
              time: 'Oct 17',
              unread: 0,
              online: true,
              avatar: 'fa-robot'
            }
          ].map((conversation) => (
            <a href="#" class="block">
              <Card className="p-3 hover:shadow-gs-lg transition-all">
                <div class="flex items-center gap-3">
                  <div class="relative">
                    <div class={`w-12 h-12 rounded-full flex items-center justify-center ${conversation.role === 'System' ? 'bg-gs-purple/10 text-gs-purple' : 'bg-gs-gold/10 text-gs-gold'}`}>
                      <i class={`fas ${conversation.avatar}`}></i>
                    </div>
                    {conversation.online && (
                      <div class="absolute bottom-0 right-0 w-3 h-3 bg-gs-green border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-0.5">
                      <h4 class="font-semibold text-sm text-gs-navy truncate">{conversation.name}</h4>
                      <span class="text-xs text-gray-400">{conversation.time}</span>
                    </div>
                    <p class="text-xs text-gray-400">{conversation.role}</p>
                    <p class="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <div class="w-5 h-5 rounded-full bg-gs-gold text-gs-navy text-xs font-bold flex items-center justify-center">
                      {conversation.unread}
                    </div>
                  )}
                </div>
              </Card>
            </a>
          ))}
        </div>
        
        {/* Quick Contact */}
        <Card className="p-4 bg-gs-navy text-white">
          <h4 class="font-bold mb-3">Need Urgent Help?</h4>
          <div class="flex gap-2">
            <button class="flex-1 py-2 bg-gs-gold text-gs-navy text-sm font-medium rounded-lg hover:bg-gs-gold-dark transition-colors">
              <i class="fas fa-phone mr-2"></i>Call Support
            </button>
            <button class="flex-1 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors">
              <i class="fas fa-video mr-2"></i>Video Call
            </button>
          </div>
        </Card>
      </main>
      
      {/* New Message FAB */}
      <button class="fixed right-4 bottom-24 w-14 h-14 bg-gs-gold text-gs-navy rounded-full shadow-gs-lg flex items-center justify-center hover:bg-gs-gold-dark transition-colors z-40">
        <i class="fas fa-edit text-lg"></i>
      </button>
    </PageWrapper>
  )
}
